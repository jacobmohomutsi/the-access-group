'use server'

import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { sendOrderConfirmation, sendPaymentLinkEmail } from '@/lib/services/email';

export async function deleteOrder(orderId) {
    const { error } = await supabaseAdmin.from('orders').delete().eq('id', orderId);
    if (error) {
        console.error("Failed to delete order:", error);
        return { error: error.message };
    }
    revalidatePath('/admin/tickets/orders');
    return { success: true };
}

export async function resendPaymentLink(orderId) {
    try {
        const { data: order } = await supabaseAdmin
            .from('orders')
            .select('*, order_items(quantity, products(name))')
            .eq('id', orderId)
            .single();

        if (!order) return { error: "Order not found" };

        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://the-access-group.vercel.app';
        const items = order.order_items.map(item => ({ quantity: item.quantity, productName: item.products.name }));
        
        // Create new Yoco checkout
        const yocoToken = process.env.YOCO_API_TOKEN;
        const yocoPayload = {
            amount: Math.round(order.amount * 100), // Amount in cents
            currency: 'ZAR',
            successUrl: `${baseUrl}/tickets/success`,
            cancelUrl: `${baseUrl}/tickets`,
            metadata: { orderId: order.id }
        };
        
        const yocoResponse = await fetch('https://payments.yoco.com/api/checkouts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${yocoToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(yocoPayload)
        });
        
        const yocoData = await yocoResponse.json();
        if (!yocoResponse.ok) {
            console.error("Yoco API Error:", yocoData);
            return { error: "Failed to create payment link" };
        }
        
        // Update order with new checkout ID
        await supabaseAdmin.from('orders').update({ yoco_checkout_id: yocoData.id }).eq('id', orderId);
        
        // Send Email
        const success = await sendPaymentLinkEmail({
            orderNumber: order.order_number,
            buyerName: order.buyer_name,
            buyerEmail: order.buyer_email,
            totalAmount: order.total_amount,
            paymentUrl: yocoData.redirectUrl,
            items
        });
        
        revalidatePath('/admin/tickets/orders');
        return { success: !!success };
    } catch (err) {
        console.error("Error resending payment link:", err);
        return { error: err.message };
    }
}

export async function resendOrderNotification(orderId) {
    try {
        const { data: order } = await supabaseAdmin
            .from('orders')
            .select('*, order_items(quantity, products(name))')
            .eq('id', orderId)
            .single();

        if (!order) return { error: "Order not found" };

        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://the-access-group.vercel.app';
        const items = order.order_items.map(item => ({ quantity: item.quantity, productName: item.products.name }));
        
        const success = await sendOrderConfirmation({
            orderNumber: order.order_number,
            buyerName: order.buyer_name,
            buyerEmail: order.buyer_email,
            totalAmount: order.total_amount,
            managementUrl: `${baseUrl}/manage/${order.management_token}`,
            items
        });
        
        return { success: !!success };
    } catch (err) {
        console.error("Error resending order notification:", err);
        return { error: err.message };
    }
}
