import { NextResponse } from 'next/server';
import { PaymentService } from '@/lib/payments/payment-service';
import { FulfillmentService } from '@/lib/services/fulfillment-service';
import { sendAccessBoxMerchantEmail } from '@/lib/services/email';

export async function POST(req: Request) {
    try {
        const rawBody = await req.text();
        console.log('[PAYSTACK_WEBHOOK]', { stage: 'received_request' });

        // 1. Verify Webhook Signature
        const isValidSignature = await PaymentService.verifyWebhook('paystack', {
            rawBody,
            headers: req.headers
        });

        if (!isValidSignature) {
            console.error('[PAYSTACK_WEBHOOK]', { stage: 'invalid_signature' });
            return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 });
        }

        // 2. Parse Webhook Event
        const parsedEvent = PaymentService.parseWebhook('paystack', rawBody);
        console.log('[PAYSTACK_WEBHOOK]', {
            stage: 'parsed_event',
            eventType: parsedEvent.eventType,
            reference: parsedEvent.reference,
            eventId: parsedEvent.eventId
        });

        // 3. Process Only Supported Events
        if (!parsedEvent.isSupportedEvent || !parsedEvent.reference) {
            console.log('[PAYSTACK_WEBHOOK]', { stage: 'ignored_unsupported_event', eventType: parsedEvent.eventType });
            return NextResponse.json({ received: true, note: 'Ignored unsupported event type' });
        }

        const reference = parsedEvent.reference;

        // 4. Verify Transaction with Paystack Server-Side
        console.log('[PAYSTACK_WEBHOOK]', { stage: 'verifying_transaction_server_side', reference });
        const verifyResult = await PaymentService.verifyPayment('paystack', reference);

        if (!verifyResult.success || verifyResult.status !== 'success') {
            console.error('[PAYSTACK_WEBHOOK]', {
                stage: 'server_side_verification_failed',
                reference,
                status: verifyResult.status,
                error: verifyResult.error
            });
            // Return 200 to prevent infinite retry loops if verification explicitly indicates failure/abandoned
            return NextResponse.json({ received: true, note: 'Transaction not successful' });
        }

        if (parsedEvent.metadata && parsedEvent.metadata.type === 'access_box') {
            console.log('[PAYSTACK_WEBHOOK]', { stage: 'access_box_paid', metadata: parsedEvent.metadata });
            await sendAccessBoxMerchantEmail(parsedEvent.metadata, reference);
            return NextResponse.json({ received: true, note: 'Access Box notification sent' });
        }

        // 5. Invoke FulfillmentService (Primary Fulfillment Trigger)
        console.log('[PAYSTACK_WEBHOOK]', { stage: 'triggering_fulfillment_service', reference });
        const fulfillmentResult = await FulfillmentService.fulfillOrder({
            paymentReference: reference,
            gatewayReference: verifyResult.gatewayReference || parsedEvent.gatewayReference,
            provider: 'paystack',
            eventId: parsedEvent.eventId
        });

        console.log('[PAYSTACK_WEBHOOK]', { stage: 'fulfillment_completed', result: fulfillmentResult });

        if (!fulfillmentResult.success) {
            console.error('[PAYSTACK_WEBHOOK]', { stage: 'fulfillment_failed', error: fulfillmentResult.error });
            return NextResponse.json({ error: fulfillmentResult.error }, { status: 500 });
        }

        return NextResponse.json({ received: true, fulfillment: fulfillmentResult.status });
    } catch (err: any) {
        console.error('[PAYSTACK_WEBHOOK]', { stage: 'uncaught_error', error: err?.message || err });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
