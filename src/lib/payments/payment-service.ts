import {
    PaymentGatewayProvider,
    PaymentGatewayInterface,
    PaymentInitializationRequest,
    PaymentInitializationResponse,
    PaymentVerificationResult,
    WebhookVerificationRequest,
    ParsedWebhookEvent
} from './types';
import { YocoGateway } from './gateways/yoco';
import { PaystackGateway } from './gateways/paystack';

export class PaymentService {
    private static gateways: Record<PaymentGatewayProvider, PaymentGatewayInterface> = {
        yoco: new YocoGateway(),
        paystack: new PaystackGateway()
    };

    static getGateway(provider: PaymentGatewayProvider): PaymentGatewayInterface {
        const gateway = this.gateways[provider];
        if (!gateway) {
            throw new Error(`Unsupported payment provider: ${provider}`);
        }
        return gateway;
    }

    static async initializePayment(provider: PaymentGatewayProvider, request: PaymentInitializationRequest): Promise<PaymentInitializationResponse> {
        console.log('[PAYMENT_SERVICE]', { stage: 'initializePayment', provider, orderNumber: request.orderNumber });
        return await this.getGateway(provider).initializePayment(request);
    }

    static async verifyPayment(provider: PaymentGatewayProvider, reference: string): Promise<PaymentVerificationResult> {
        console.log('[PAYMENT_SERVICE]', { stage: 'verifyPayment', provider, reference });
        return await this.getGateway(provider).verifyPayment(reference);
    }

    static async verifyWebhook(provider: PaymentGatewayProvider, request: WebhookVerificationRequest): Promise<boolean> {
        return await this.getGateway(provider).verifyWebhook(request);
    }

    static parseWebhook(provider: PaymentGatewayProvider, rawBody: string): ParsedWebhookEvent {
        return this.getGateway(provider).parseWebhook(rawBody);
    }
}
