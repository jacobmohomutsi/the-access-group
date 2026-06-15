import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { sendOrderConfirmation } from '@/lib/services/email';

// Helper to verify Yoco Webhook Signature (Standard Webhooks format)
function verifySignature(payloadStr, headers, secret) {
    const webhookId = headers.get('webhook-id');
    const webhookTimestamp = headers.get('webhook-timestamp');
    const webhookSignature = headers.get('webhook-signature');

    if (!webhookId || !webhookTimestamp || !webhookSignature || !secret) {
        return false;
    }

    // Prevent replay attacks (older than 5 minutes)
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (currentTimestamp - parseInt(webhookTimestamp, 10) > 300) {
        return false;
    }

    // Construct the signed content
    const signedPayload = `${webhookId}.${webhookTimestamp}.${payloadStr}`;

    // Remove 'whsec_' prefix and base64 decode the secret
    const secretKey = secret.replace(/^whsec_/, '');
    const decodedSecret = Buffer.from(secretKey, 'base64');

    // Calculate expected signature
    const expectedSignature = crypto
        .createHmac('sha256', decodedSecret)
        .update(signedPayload, 'utf8')
        .digest('base64');

    // webhook-signature header can contain multiple signatures separated by spaces
    // e.g., "v1,sig1 v1,sig2"
    const signatures = webhookSignature.split(' ').map(s => {
        const parts = s.split(',');
        return parts.length > 1 ? parts[1] : parts[0];
    });

    return signatures.includes(expectedSignature);
}

export async function POST(req) {
    try {
        const payloadStr = await req.text();
        const webhookSecret = process.env.YOCO_WEBHOOK_SECRET;

        // Verify Signature
        if (webhookSecret && !verifySignature(payloadStr, req.headers, webhookSecret)) {
            console.error('Invalid Yoco Webhook Signature');
            return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
        }

        const event = JSON.parse(payloadStr);

        // We only care about payment.succeeded
        if (event.type !== 'payment.succeeded') {
            return NextResponse.json({ received: true });
        }

        const checkoutId = event.payload.checkoutId || (event.payload.metadata && event.payload.metadata.checkoutId) || null;
        const paymentId = event.payload.id;
        const eventId = event.id; // Yoco webhook event ID for idempotency

        // Execute atomic transaction via Supabase RPC
        const { data, error } = await supabaseAdmin.rpc('process_yoco_webhook', {
            p_checkout_id: checkoutId,
            p_payment_id: paymentId,
            p_webhook_event_id: eventId,
            p_provider: 'yoco'
        });

        if (error) {
            console.error('Webhook RPC Error:', error);
            // If it's a capacity error, we might want to return 200 so Yoco doesn't retry,
            // or 500 if we want it to retry (though capacity won't change).
            // Let's return 200 and log it to prevent endless retries.
            return NextResponse.json({ error: error.message }, { status: 200 });
        }

        if (data.status === 'already_processed' || data.status === 'already_paid') {
            return NextResponse.json({ received: true, note: data.status });
        }

        if (data.status === 'success') {
            // Fetch order details for email
            const { data: order } = await supabaseAdmin
                .from('orders')
                .select(`
                    order_number, 
                    buyer_name, 
                    buyer_email, 
                    total_amount, 
                    management_token,
                    order_items (
                        quantity,
                        products ( name )
                    )
                `)
                .eq('id', data.order_id)
                .single();

            if (order) {
                // Determine base URL dynamically or from env
                const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://theaccessgroup.co.za';
                
                const items = order.order_items.map(i => ({
                    quantity: i.quantity,
                    productName: i.products.name
                }));

                await sendOrderConfirmation({
                    orderNumber: order.order_number,
                    buyerName: order.buyer_name,
                    buyerEmail: order.buyer_email,
                    totalAmount: order.total_amount,
                    managementUrl: `${baseUrl}/manage/${order.management_token}`,
                    items
                });
            }
        }

        return NextResponse.json({ received: true, success: true });
    } catch (err) {
        console.error('Yoco Webhook Route Error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
