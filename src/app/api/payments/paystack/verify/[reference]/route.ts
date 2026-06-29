import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { PaymentService } from '@/lib/payments/payment-service';
import { FulfillmentService } from '@/lib/services/fulfillment-service';

export async function GET(req: Request, context: { params: Promise<{ reference: string }> }) {
    try {
        const { reference } = await context.params;
        const url = new URL(req.url);
        const attempt = parseInt(url.searchParams.get('attempt') || '1', 10);
        const forceRecovery = url.searchParams.get('recovery') === 'true';

        if (!reference) {
            return NextResponse.json({ error: 'Missing reference parameter' }, { status: 400 });
        }

        console.log('[PAYSTACK_VERIFY]', { stage: 'checking_order_status', reference, attempt });

        // 1. Check whether order has already been fulfilled in database
        const { data: order, error: orderError } = await supabaseAdmin
            .from('orders')
            .select('id, order_number, payment_status, status, created_at')
            .or(`payment_reference.eq.${reference},order_number.eq.${reference}`)
            .single();

        if (orderError || !order) {
            console.error('[PAYSTACK_VERIFY]', { stage: 'order_not_found', reference });
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        if (order.payment_status === 'paid' || order.status === 'paid') {
            console.log('[PAYSTACK_VERIFY]', { stage: 'already_fulfilled', reference });
            return NextResponse.json({
                status: 'success',
                fulfilled: true,
                orderId: order.id,
                orderNumber: order.order_number
            });
        }

        // 2. Verify transaction with Paystack API
        console.log('[PAYSTACK_VERIFY]', { stage: 'calling_paystack_verify_api', reference });
        const verifyResult = await PaymentService.verifyPayment('paystack', reference);

        if (!verifyResult.success || verifyResult.status !== 'success') {
            console.log('[PAYSTACK_VERIFY]', { stage: 'payment_not_successful', status: verifyResult.status });
            return NextResponse.json({
                status: verifyResult.status,
                fulfilled: false,
                error: verifyResult.error
            });
        }

        // 3. Check timeout / recovery condition for delayed webhooks
        const elapsedMs = Date.now() - new Date(order.created_at).getTime();
        const timeoutThresholdMs = 12000; // 12 seconds timeout threshold

        const shouldRecover = forceRecovery || attempt >= 3 || elapsedMs > timeoutThresholdMs;

        if (!shouldRecover) {
            console.log('[PAYSTACK_VERIFY]', {
                stage: 'webhook_pending',
                note: 'Payment successful on Paystack but webhook pending fulfillment. Returning pending to allow continued polling.',
                elapsedMs,
                attempt
            });
            return NextResponse.json({
                status: 'pending',
                fulfilled: false,
                note: 'Verifying webhook confirmation...'
            });
        }

        // 4. Controlled Recovery Flow: Invoke FulfillmentService
        console.warn('[PAYSTACK_VERIFY]', {
            stage: 'invoking_fallback_recovery',
            reference,
            elapsedMs,
            attempt,
            note: 'Webhook delayed or timed out. Triggering idempotent fallback fulfillment.'
        });

        const fulfillmentResult = await FulfillmentService.fulfillOrder({
            orderId: order.id,
            paymentReference: reference,
            gatewayReference: verifyResult.gatewayReference,
            provider: 'paystack',
            eventId: `recovery_${reference}`
        });

        if (!fulfillmentResult.success) {
            console.error('[PAYSTACK_VERIFY]', { stage: 'recovery_fulfillment_failed', error: fulfillmentResult.error });
            return NextResponse.json({
                status: 'pending',
                fulfilled: false,
                error: fulfillmentResult.error
            });
        }

        return NextResponse.json({
            status: 'success',
            fulfilled: true,
            recovered: true,
            orderId: order.id,
            orderNumber: order.order_number
        });
    } catch (err: any) {
        console.error('[PAYSTACK_VERIFY]', { stage: 'uncaught_error', error: err?.message || err });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
