import { supabaseAdmin } from '@/lib/supabase-admin';
import { generateAndUploadQR } from '@/lib/services/qr';
import { sendOrderConfirmation } from '@/lib/services/email';

export interface FulfillmentRequest {
    orderId?: string;
    paymentReference: string;
    gatewayReference?: string;
    provider: 'yoco' | 'paystack';
    eventId?: string; // Webhook event ID for idempotency
}

export interface FulfillmentResult {
    success: boolean;
    status: 'success' | 'already_fulfilled' | 'failed';
    orderId?: string;
    ticketsGenerated?: number;
    error?: string;
}

export class FulfillmentService {
    /**
     * Fulfills an order atomically and idempotently upon confirmed payment success.
     */
    static async fulfillOrder(request: FulfillmentRequest): Promise<FulfillmentResult> {
        console.log('[FULFILLMENT_SERVICE]', {
            stage: 'start_fulfillment',
            request
        });

        try {
            // 1. First check if order is already marked paid to avoid unnecessary work
            let query = supabaseAdmin.from('orders').select('id, order_number, payment_status, status');
            if (request.orderId) {
                query = query.eq('id', request.orderId);
            } else {
                query = query.or(`payment_reference.eq.${request.paymentReference},order_number.eq.${request.paymentReference}`);
            }

            const { data: existingOrder, error: fetchError } = await query.single();
            if (fetchError || !existingOrder) {
                console.error('[FULFILLMENT_SERVICE]', { stage: 'order_not_found', error: fetchError, request });
                return { success: false, status: 'failed', error: 'Order not found' };
            }

            const orderId = existingOrder.id;

            // Strengthened Idempotency check
            if (existingOrder.payment_status === 'paid' || existingOrder.status === 'paid') {
                console.log('[FULFILLMENT_SERVICE]', {
                    stage: 'already_fulfilled_check',
                    orderId,
                    note: 'Order is already paid. Skipping repeat operations.'
                });
                return { success: true, status: 'already_fulfilled', orderId };
            }

            // 2. Execute atomic database completion via RPC
            const { data: rpcData, error: rpcError } = await supabaseAdmin.rpc('process_shared_fulfillment', {
                p_order_id: orderId,
                p_payment_reference: request.paymentReference,
                p_gateway_reference: request.gatewayReference || null,
                p_event_id: request.eventId || null,
                p_provider: request.provider
            });

            if (rpcError) {
                console.error('[FULFILLMENT_SERVICE]', {
                    stage: 'rpc_error',
                    error: rpcError,
                    orderId
                });
                return { success: false, status: 'failed', error: rpcError.message };
            }

            console.log('[FULFILLMENT_SERVICE]', {
                stage: 'rpc_completed',
                rpcData,
                orderId
            });

            if (rpcData?.status === 'already_paid' || rpcData?.status === 'already_processed') {
                return { success: true, status: 'already_fulfilled', orderId };
            }

            if (rpcData?.status !== 'success') {
                return { success: false, status: 'failed', error: `Fulfillment failed with status ${rpcData?.status}` };
            }

            // 3. Generate QR codes for all tickets created for this order
            console.log('[FULFILLMENT_SERVICE]', { stage: 'generating_qr_codes', orderId });
            const { data: tickets } = await supabaseAdmin
                .from('tickets')
                .select('id, ticket_number, qr_url')
                .eq('order_id', orderId);

            if (tickets && tickets.length > 0) {
                for (const ticket of tickets) {
                    if (!ticket.qr_url) {
                        try {
                            const qrUrl = await generateAndUploadQR(ticket.id, ticket.ticket_number);
                            if (qrUrl) {
                                await supabaseAdmin
                                    .from('tickets')
                                    .update({ qr_url: qrUrl })
                                    .eq('id', ticket.id);
                            }
                        } catch (qrErr) {
                            console.error('[FULFILLMENT_SERVICE]', { stage: 'qr_upload_error', ticketId: ticket.id, error: qrErr });
                        }
                    }
                }
            }

            // 4. Fetch full order details to send confirmation email
            console.log('[FULFILLMENT_SERVICE]', { stage: 'fetching_order_for_email', orderId });
            const { data: fullOrder } = await supabaseAdmin
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
                .eq('id', orderId)
                .single();

            if (fullOrder) {
                console.log('[FULFILLMENT_SERVICE]', { stage: 'sending_email', email: fullOrder.buyer_email, orderNumber: fullOrder.order_number });
                const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://theaccessgroup.co.za';
                const items = (fullOrder.order_items || []).map((i: any) => ({
                    quantity: i.quantity,
                    productName: i.products?.name || 'Ticket'
                }));

                await sendOrderConfirmation({
                    orderNumber: fullOrder.order_number,
                    buyerName: fullOrder.buyer_name,
                    buyerEmail: fullOrder.buyer_email,
                    totalAmount: fullOrder.total_amount,
                    managementUrl: `${baseUrl}/manage/${fullOrder.management_token}`,
                    items
                });
                console.log('[FULFILLMENT_SERVICE]', { stage: 'email_sent', orderNumber: fullOrder.order_number });
            }

            return {
                success: true,
                status: 'success',
                orderId,
                ticketsGenerated: rpcData.tickets_generated || (tickets?.length || 0)
            };

        } catch (err: any) {
            console.error('[FULFILLMENT_SERVICE]', { stage: 'uncaught_error', error: err?.stack || err });
            return { success: false, status: 'failed', error: err?.message || 'Internal error' };
        }
    }
}
