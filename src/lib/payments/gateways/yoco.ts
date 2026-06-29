import crypto from 'crypto';
import {
    PaymentGatewayInterface,
    PaymentInitializationRequest,
    PaymentInitializationResponse,
    PaymentVerificationResult,
    WebhookVerificationRequest,
    ParsedWebhookEvent
} from '../types';

export class YocoGateway implements PaymentGatewayInterface {
    async initializePayment(request: PaymentInitializationRequest): Promise<PaymentInitializationResponse> {
        const yocoToken = process.env.YOCO_API_TOKEN;
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://theaccessgroup.co.za';

        const yocoPayload = {
            amount: Math.round(request.amount * 100),
            currency: request.currency || 'ZAR',
            clientReferenceId: request.orderNumber,
            successUrl: request.callbackUrl || `${baseUrl}/tickets/success`,
            cancelUrl: `${baseUrl}/tickets`,
            metadata: {
                order_id: request.orderId,
                ...request.metadata
            }
        };

        const response = await fetch('https://payments.yoco.com/api/checkouts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${yocoToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(yocoPayload)
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('[YOCO_GATEWAY]', { stage: 'init_error', status: response.status, data });
            throw new Error(data.message || 'Failed to initialize Yoco payment');
        }

        return {
            authorizationUrl: data.redirectUrl,
            gatewayReference: data.id
        };
    }

    async verifyPayment(reference: string): Promise<PaymentVerificationResult> {
        const yocoToken = process.env.YOCO_API_TOKEN;
        if (!yocoToken) {
            throw new Error('Missing YOCO_API_TOKEN');
        }

        try {
            const response = await fetch(`https://payments.yoco.com/api/checkouts/${encodeURIComponent(reference)}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${yocoToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                return {
                    success: false,
                    status: 'failed',
                    reference,
                    error: `Yoco verification failed with status ${response.status}`
                };
            }

            const data = await response.json();
            const isSuccess = data.status === 'completed' || data.status === 'paid' || data.status === 'succeeded';

            return {
                success: isSuccess,
                status: isSuccess ? 'success' : (data.status === 'pending' ? 'pending' : 'failed'),
                amount: data.amount ? data.amount / 100 : undefined,
                currency: data.currency,
                reference: data.clientReferenceId || reference,
                gatewayReference: data.id,
                rawResponse: data
            };
        } catch (err: any) {
            return {
                success: false,
                status: 'failed',
                reference,
                error: err.message
            };
        }
    }

    async verifyWebhook(request: WebhookVerificationRequest): Promise<boolean> {
        const webhookSecret = process.env.YOCO_WEBHOOK_SECRET;
        if (!webhookSecret) return false;

        const webhookId = request.headers.get('webhook-id');
        const webhookTimestamp = request.headers.get('webhook-timestamp');
        const webhookSignature = request.headers.get('webhook-signature');

        if (!webhookId || !webhookTimestamp || !webhookSignature) return false;

        // Prevent replay attacks (older than 5 minutes)
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (currentTimestamp - parseInt(webhookTimestamp, 10) > 300) return false;

        const signedPayload = `${webhookId}.${webhookTimestamp}.${request.rawBody}`;
        const secretKey = webhookSecret.replace(/^whsec_/, '');
        const decodedSecret = Buffer.from(secretKey, 'base64');

        const expectedSignature = crypto
            .createHmac('sha256', decodedSecret)
            .update(signedPayload, 'utf8')
            .digest('base64');

        const signatures = webhookSignature.split(' ').map(s => {
            const parts = s.split(',');
            return parts.length > 1 ? parts[1] : parts[0];
        });

        return signatures.includes(expectedSignature);
    }

    parseWebhook(rawBody: string): ParsedWebhookEvent {
        try {
            const event = JSON.parse(rawBody);
            const isSupported = event.type === 'payment.succeeded';
            const checkoutId = event.payload?.checkoutId || event.payload?.metadata?.checkoutId;

            return {
                isSupportedEvent: isSupported,
                eventType: event.type || 'unknown',
                reference: event.payload?.clientReferenceId,
                gatewayReference: checkoutId,
                eventId: event.id,
                metadata: event.payload?.metadata,
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
