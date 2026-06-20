'use server';

import { supabaseAdmin } from '@/lib/supabase-admin';
import { revalidatePath } from 'next/cache';

export async function updateTicketPrice(id, newPrice) {
    if (!id || newPrice == null) {
        return { success: false, error: 'Invalid data provided' };
    }

    try {
        const parsedPrice = parseFloat(newPrice);
        if (isNaN(parsedPrice) || parsedPrice < 0) {
            return { success: false, error: 'Price must be a valid positive number' };
        }

        const { error } = await supabaseAdmin
            .from('products')
            .update({ price: parsedPrice })
            .eq('id', id);

        if (error) {
            console.error('Error updating ticket price:', error);
            return { success: false, error: error.message };
        }

        // Revalidate the admin types page and the public ticket pages
        revalidatePath('/admin/tickets/types');
        revalidatePath('/tickets');
        revalidatePath('/tickets/checkout');

        return { success: true };
    } catch (err) {
        console.error('Unexpected error updating ticket price:', err);
        return { success: false, error: 'Internal server error' };
    }
}
