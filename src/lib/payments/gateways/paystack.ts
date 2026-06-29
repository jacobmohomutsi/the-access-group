import crypto from 'crypto';
import {
    PaymentGatewayInterface,
    PaymentInitializationRequest,
    PaymentInitializationResponse,
    PaymentVerificationResult,
    WebhookVerificationRequest,
    ParsedWebhookEvent
} from '../types';

export class PaystackGateway implements PaymentGatewayInterface {
    async initializePayment(request: PaymentInitializationRequest): Promise<PaymentInitializationResponse> {
        const secretKey = process.env.PAYSTACK_SECRET_KEY;
        if (!secretKey) {
            throw new Error('Missing PAYSTACK_SECRET_KEY environment variable');
        }

        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://theaccessgroup.co.za';
        const callbackUrl = request.callbackUrl || `${baseUrl}/api/payments/paystack/callback`;

        // Convert amount to smallest currency unit required by Paystack (e.g. cents/kobo)
        const amountInSmallestUnit = Math.round(request.amount * 100);

        const payload = {
            email: request.buyerEmail,
            amount: amountInSmallestUnit,
            currency: request.currency || 'ZAR',
            reference: request.orderNumber,
            callback_url: callbackUrl,
            metadata: {
                orderId: request.orderId,
                orderNumber: request.orderNumber,
                buyerName: request.buyerName,
                buyerSurname: request.buyerSurname,
                buyerPhone: request.buyerPhone,
                ...request.metadata
            }
        };

        console.log('[PAYSTACK_GATEWAY]', { stage: 'initializing', reference: request.orderNumber, amount: amountInSmallestUnit });

        const response = await fetch('https://api.paystack.co/transaction/initialize', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${secretKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok || !data.status) {
            console.error('[PAYSTACK_GATEWAY]', { stage: 'init_error', status: response.status, data });
            throw new Error(data.message || 'Failed to initialize Paystack transaction');
        }

        return {
            authorizationUrl: data.data.authorization_url,
            gatewayReference: data.data.reference || data.data.access_code
        };
    }

    async verifyPayment(reference: string): Promise<PaymentVerificationResult> {
        const secretKey = process.env.PAYSTACK_SECRET_KEY;
        if (!secretKey) {
            throw new Error('Missing PAYSTACK_SECRET_KEY environment variable');
        }

        console.log('[PAYSTACK_GATEWAY]', { stage: 'verifying', reference });

        try {
            const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${secretKey}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (!response.ok || !data.status) {
                console.error('[PAYSTACK_GATEWAY]', { stage: 'verify_api_error', status: response.status, data });
                return {
                    success: false,
                    status: 'failed',
                    reference,
                    error: data.message || `Verification failed with status ${response.status}`
                };
            }

            const txData = data.data;
            const isSuccess = txData.status === 'success';
            let mappedStatus: 'success' | 'pending' | 'failed' | 'abandoned' = 'failed';
            if (isSuccess) mappedStatus = 'success';
            else if (txData.status === 'abandoned') mappedStatus = 'abandoned';
            else if (txData.status === 'pending' || txData.status === 'ongoing') mappedStatus = 'pending';

            return {
                success: isSuccess,
                status: mappedStatus,
                amount: txData.amount ? txData.amount / 100 : undefined, // Convert back from smallest unit
                currency: txData.currency,
                reference: txData.reference || reference,
                gatewayReference: txData.id?.toString() || txData.reference,
                rawResponse: txData
            };
        } catch (err: any) {
            console.error('[PAYSTACK_GATEWAY]', { stage: 'verify_uncaught_error', error: err.message });
            return {
                success: false,
                status: 'failed',
                reference,
                error: err.message
            };
        }
    }

    async verifyWebhook(request: WebhookVerificationRequest): Promise<boolean> {
        const secretKey = process.env.PAYSTACK_SECRET_KEY;
        if (!secretKey) {
            console.error('[PAYSTACK_GATEWAY]', { stage: 'webhook_verify_missing_secret' });
            return false;
        }

        const signature = request.headers.get('x-paystack-signature');
        if (!signature) {
            console.error('[PAYSTACK_GATEWAY]', { stage: 'webhook_verify_missing_header' });
            return false;
        }

        const computedHash = crypto
            .createHmac('sha512', secretKey)
            .update(request.rawBody, 'utf8')
            .digest('hex');

        return computedHash === signature;
    }

    parseWebhook(rawBody: string): ParsedWebhookEvent {
        try {
            const event = JSON.parse(rawBody);
            const isSupported = event.event === 'charge.success';

            return {
                isSupportedEvent: isSupported,
                eventType: event.event || 'unknown',
                reference: event.data?.reference,
                gatewayReference: event.data?.id?.toString() || event.data?.reference,
                eventId: event.data?.id?.toString() || event.event || 'unknown',
                metadata: event.data?.metadata,
                rawEvent: event
            };
        } catch (err) {
            return {
                isSupportedEvent: false,
                eventType: 'invalid_json',
                rawEvent: null
            };
        }
    }
}
