import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { PaymentService } from '@/lib/payments/payment-service';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { buyerName, buyerSurname, buyerEmail, buyerPhone, buyerCompany, items } = body;

        if (!buyerName || !buyerSurname || !buyerEmail || !buyerPhone || !items || !Array.isArray(items) || items.length === 0) {
            return NextResponse.json({ error: 'Missing required fields or empty cart' }, { status: 400 });
        }

        const totalAmount = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
        const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const randomDigits = Math.floor(100000 + Math.random() * 900000);
        const reference = `TAG-${dateStr}-${randomDigits}`;

        console.log('[PAYSTACK_INIT]', { stage: 'start', buyerEmail, totalAmount, reference });

        // Soft Capacity Check
        const productIds = items.map((i: any) => i.id);
        const { data: rules } = await supabaseAdmin
            .from('product_event_rules')
            .select('event_id, quantity_required, product_id, events(capacity)')
            .in('product_id', productIds);

        const requiredPerEvent: Record<string, { required: number; capacity: number }> = {};
        for (const rule of (rules || [])) {
            const item = items.find((i: any) => i.id === rule.product_id);
            if (item) {
                if (!requiredPerEvent[rule.event_id]) {
                    requiredPerEvent[rule.event_id] = {
                        required: 0,
                        capacity: (rule as any).events?.capacity || 0
                    };
                }
                requiredPerEvent[rule.event_id].required += (item.quantity * rule.quantity_required);
            }
        }

        for (const eventId of Object.keys(requiredPerEvent)) {
            const { data: usedData } = await supabaseAdmin
                .from('order_items')
                .select(`
                    quantity,
                    product_id,
                    orders!inner(payment_status),
                    product_event_rules!inner(quantity_required)
                `)
                .eq('orders.payment_status', 'paid')
                .eq('product_event_rules.event_id', eventId);

            let used = 0;
            if (usedData) {
                usedData.forEach((row: any) => {
                    used += (row.quantity * (row.product_event_rules[0]?.quantity_required || 0));
                });
            }

            if (used + requiredPerEvent[eventId].required > requiredPerEvent[eventId].capacity) {
                console.warn('[PAYSTACK_INIT]', { stage: 'capacity_exceeded', eventId });
                return NextResponse.json({ error: 'capacity_exceeded', message: 'Event capacity exceeded for one or more items.' }, { status: 400 });
            }
        }

        // Create Order in Database
        const totalQuantity = items.reduce((sum: number, item: any) => sum + item.quantity, 0);
        const { data: order, error: orderError } = await supabaseAdmin
            .from('orders')
            .insert({
                order_number: reference,
                payment_reference: reference,
                buyer_name: buyerName,
                buyer_surname: buyerSurname,
                buyer_email: buyerEmail,
                buyer_phone: buyerPhone,
                buyer_company: buyerCompany || null,
                total_amount: totalAmount,
                amount: totalAmount,
                payment_status: 'pending',
                status: 'pending',
                gateway: 'paystack',
                quantity: totalQuantity,
                management_token: crypto.randomUUID()
            })
            .select()
            .single();

        if (orderError || !order) {
            console.error('[PAYSTACK_INIT]', { stage: 'db_order_create_error', error: orderError });
            return NextResponse.json({ error: 'Failed to create order in database' }, { status: 500 });
        }

        // Create Order Items
        const orderItemsToInsert = items.map((item: any) => ({
            order_id: order.id,
            product_id: item.id,
            quantity: item.quantity,
            unit_price: item.price,
            line_total: item.price * item.quantity
        }));

        const { error: itemsError } = await supabaseAdmin
            .from('order_items')
            .insert(orderItemsToInsert);

        if (itemsError) {
            console.error('[PAYSTACK_INIT]', { stage: 'db_items_create_error', error: itemsError });
            return NextResponse.json({ error: 'Failed to save order items' }, { status: 500 });
        }

        // Initialize Paystack Payment via PaymentService
        const initResponse = await PaymentService.initializePayment('paystack', {
            orderId: order.id,
            orderNumber: reference,
            amount: totalAmount,
            currency: 'ZAR',
            buyerEmail,
            buyerName,
            buyerSurname,
            buyerPhone,
            metadata: {
                orderId: order.id,
                orderNumber: reference,
                quantity: totalQuantity
            }
        });

        // Update Order with Gateway Reference
        if (initResponse.gatewayReference) {
            await supabaseAdmin
                .from('orders')
                .update({ gateway_reference: initResponse.gatewayReference })
                .eq('id', order.id);
        }

        console.log('[PAYSTACK_INIT]', { stage: 'success', reference, authUrl: initResponse.authorizationUrl });

        return NextResponse.json({
            authorization_url: initResponse.authorizationUrl,
            reference
        });
    } catch (err: any) {
        console.error('[PAYSTACK_INIT]', { stage: 'uncaught_error', error: err?.message || err });
        return NextResponse.json({ error: err?.message || 'Internal Server Error' }, { status: 500 });
    }
}
