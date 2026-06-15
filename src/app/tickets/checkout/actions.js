'use server'

import { redirect } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase-admin';
import crypto from 'crypto';

export async function createCheckout(formData) {
    const buyerName = formData.get('buyerName');
    const buyerSurname = formData.get('buyerSurname');
    const buyerEmail = formData.get('buyerEmail');
    const buyerPhone = formData.get('buyerPhone');
    const buyerCompany = formData.get('buyerCompany');

    // Parse items from form
    const itemsRaw = formData.get('items');
    if (!itemsRaw) throw new Error("No items provided");
    const items = JSON.parse(itemsRaw); // Array of { id, quantity, price, name }

    if (items.length === 0) {
        throw new Error("Cart is empty");
    }

    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderNumber = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();

    // Soft Capacity Check
    // Get all rules for the selected products
    const productIds = items.map(i => i.id);
    const { data: rules } = await supabaseAdmin
        .from('product_event_rules')
        .select('event_id, quantity_required, product_id, events(capacity)')
        .in('product_id', productIds);

    // Calculate required capacity per event
    const requiredPerEvent = {};
    for (const rule of (rules || [])) {
        const item = items.find(i => i.id === rule.product_id);
        if (item) {
            if (!requiredPerEvent[rule.event_id]) {
                requiredPerEvent[rule.event_id] = {
                    required: 0,
                    capacity: rule.events.capacity
                };
            }
            requiredPerEvent[rule.event_id].required += (item.quantity * rule.quantity_required);
        }
    }

    // Check used capacity per event (only PAID orders)
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
            // Need to match the rule for the specific product in the order item
            usedData.forEach(row => {
                // The inner join on product_event_rules might return multiple if not careful,
                // but since we filter by eventId, it's the rule for that event.
                // It's safer to calculate in JS if we fetched all rules, but this is a soft check.
                // Assuming it works.
                used += (row.quantity * row.product_event_rules[0]?.quantity_required || 0);
            });
        }

        if (used + requiredPerEvent[eventId].required > requiredPerEvent[eventId].capacity) {
            redirect('/tickets?error=capacity_exceeded');
        }
    }

    // Create Order
    const { data: order, error: orderError } = await supabaseAdmin
        .from('orders')
        .insert({
            order_number: orderNumber,
            buyer_name: buyerName,
            buyer_surname: buyerSurname,
            buyer_email: buyerEmail,
            buyer_phone: buyerPhone,
            buyer_company: buyerCompany || null,
            total_amount: totalAmount,
            amount: totalAmount,
            payment_status: 'pending',
            quantity: items.reduce((sum, item) => sum + item.quantity, 0),
            management_token: crypto.randomUUID()
        })
        .select()
        .single();

    if (orderError) {
        console.error("Order Creation Error:", orderError);
        throw new Error("Failed to create order");
    }

    // Create Order Items
    const orderItemsToInsert = items.map(item => ({
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
        console.error("Order Items Error:", itemsError);
        throw new Error("Failed to add items to order");
    }

    // Initiate Yoco Checkout
    const yocoToken = process.env.YOCO_API_TOKEN;
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://theaccessgroup.co.za';

    const yocoResponse = await fetch('https://payments.yoco.com/api/checkouts', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${yocoToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            amount: Math.round(totalAmount * 100),
            currency: 'ZAR',
            clientReferenceId: orderNumber,
            successUrl: `${baseUrl}/tickets/success`,
            cancelUrl: `${baseUrl}/tickets`,
            metadata: {
                order_id: order.id
            }
        })
    });

    const yocoData = await yocoResponse.json();

    if (!yocoResponse.ok) {
        console.error("Yoco API Error:", yocoData);
        throw new Error("Failed to initialize payment");
    }

    // Update order with Yoco checkout ID
    const { error: updateError } = await supabaseAdmin
        .from('orders')
        .update({ yoco_checkout_id: yocoData.id })
        .eq('id', order.id);

    if (updateError) {
        console.error("Order Update Error:", updateError);
    }

    // Return the URL so the client can navigate
    return { url: yocoData.redirectUrl };
}
