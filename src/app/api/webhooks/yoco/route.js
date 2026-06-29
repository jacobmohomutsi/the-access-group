import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { sendOrderConfirmation, sendAccessBoxMerchantEmail } from '@/lib/services/email';

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
        console.log('[YOCO_WEBHOOK]', { 
            stage: 'received_request', 
            headers: {
                'webhook-id': req.headers.get('webhook-id'),
                'webhook-timestamp': req.headers.get('webhook-timestamp'),
                'webhook-signature': req.headers.get('webhook-signature')
            }
        });

        const payloadStr = await req.text();
        console.log('[YOCO_WEBHOOK]', { stage: 'raw_payload', payload: payloadStr });
        const webhookSecret = process.env.YOCO_WEBHOOK_SECRET;

        // Verify Signature
        if (webhookSecret && !verifySignature(payloadStr, req.headers, webhookSecret)) {
            console.error('[PAYMENT_ERROR]', { stage: 'webhook_signature_verification_failed' });
            return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
        }

        const event = JSON.parse(payloadStr);
        console.log('[YOCO_WEBHOOK]', { 
            stage: 'parsed_event', 
            event_type: event.type, 
            event_id: event.id 
        });

        // We only care about payment.succeeded
        if (event.type !== 'payment.succeeded') {
            console.log('[YOCO_WEBHOOK]', { stage: 'ignored_event_type', type: event.type });
            return NextResponse.json({ received: true });
        }

        const checkoutId = event.payload.checkoutId || (event.payload.metadata && event.payload.metadata.checkoutId) || null;
        const paymentId = event.payload.id;
        const eventId = event.id; // Yoco webhook event ID for idempotency

        console.log('[YOCO_WEBHOOK]', { 
            stage: 'processing_payment_succeeded', 
            yoco_checkout_id: checkoutId, 
            payment_id: paymentId, 
            metadata: event.payload.metadata 
        });

        if (event.payload.metadata && event.payload.metadata.type === 'access_box') {
            console.log('[YOCO_WEBHOOK]', { stage: 'access_box_paid', metadata: event.payload.metadata });
            await sendAccessBoxMerchantEmail(event.payload.metadata, paymentId);
            return NextResponse.json({ received: true, note: 'Access Box notification sent' });
        }

        // Execute atomic transaction via Supabase RPC
        const { data, error } = await supabaseAdmin.rpc('process_yoco_webhook', {
            p_checkout_id: checkoutId,
            p_payment_id: paymentId,
            p_webhook_event_id: eventId,
            p_provider: 'yoco'
        });

        if (error) {
            console.error('[PAYMENT_ERROR]', { 
                stage: 'webhook_rpc_failed', 
                error: error,
                yoco_checkout_id: checkoutId,
                payment_id: paymentId
            });
            // If it's a capacity error, we might want to return 200 so Yoco doesn't retry,
            // or 500 if we want it to retry (though capacity won't change).
            // Let's return 200 and log it to prevent endless retries.
            return NextResponse.json({ error: error.message }, { status: 200 });
        }

        console.log('[ORDER]', { 
            stage: 'webhook_rpc_completed', 
            status: data.status, 
            order_id: data.order_id,
            yoco_checkout_id: checkoutId,
            payment_id: paymentId
        });

        if (data.status === 'already_processed' || data.status === 'already_paid') {
            return NextResponse.json({ received: true, note: data.status });
        }

        if (data.status === 'success') {
            console.log('[ORDER]', { stage: 'fetching_order_details_for_email', order_id: data.order_id });
            
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
                console.log('[ORDER]', { stage: 'sending_confirmation_email', order_number: order.order_number, email: order.buyer_email });
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
                console.log('[ORDER]', { stage: 'confirmation_email_sent', order_number: order.order_number });
            } else {
                console.error('[PAYMENT_ERROR]', { stage: 'email_order_not_found', order_id: data.order_id });
            }
        }

        console.log('[YOCO_WEBHOOK]', { stage: 'processing_complete', success: true });
        return NextResponse.json({ received: true, success: true });
    } catch (err) {
        console.error('[PAYMENT_ERROR]', { stage: 'webhook_route_uncaught_error', error: err.stack || err });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
