export type PaymentGatewayProvider = 'yoco' | 'paystack';

export interface PaymentItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export interface PaymentInitializationRequest {
    orderId: string;
    orderNumber: string;
    amount: number; // Standard currency unit (e.g. Rand)
    currency: string;
    buyerEmail: string;
    buyerName: string;
    buyerSurname: string;
    buyerPhone: string;
    callbackUrl?: string;
    metadata?: Record<string, any>;
}

export interface PaymentInitializationResponse {
    authorizationUrl: string;
    gatewayReference?: string;
}

export interface PaymentVerificationResult {
    success: boolean;
    status: 'success' | 'pending' | 'failed' | 'abandoned';
    amount?: number; // Standard currency unit
    currency?: string;
    reference: string;
    gatewayReference?: string;
    rawResponse?: any;
    error?: string;
}

export interface WebhookVerificationRequest {
    rawBody: string;
    headers: Headers;
}

export interface ParsedWebhookEvent {
    isSupportedEvent: boolean;
    eventType: string;
    reference?: string;
    gatewayReference?: string;
    eventId?: string;
    metadata?: Record<string, any>;
    rawEvent: any;
}

export interface PaymentGatewayInterface {
    initializePayment(request: PaymentInitializationRequest): Promise<PaymentInitializationResponse>;
    verifyPayment(reference: string): Promise<PaymentVerificationResult>;
    verifyWebhook(request: WebhookVerificationRequest): Promise<boolean>;
    parseWebhook(rawBody: string): ParsedWebhookEvent;
}
