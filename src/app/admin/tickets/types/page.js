import { supabaseAdmin } from '@/lib/supabase-admin';
import TicketTypesClient from './TicketTypesClient';

export const revalidate = 0;

export default async function TicketTypesAdminPage() {
    // Fetch all products, sorted by price (most expensive first)
    const { data: products, error } = await supabaseAdmin
        .from('products')
        .select('*')
        .order('price', { ascending: false });

    if (error) {
        console.error('Error fetching products:', error);
    }

    return (
        <div className="max-w-4xl mx-auto w-full">
            <div className="mb-10 text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-black text-primary tracking-tight mb-2">Ticket Types</h1>
                <p className="text-primary/60 font-medium">Manage your event ticket packages and update their pricing.</p>
            </div>

            <TicketTypesClient initialProducts={products || []} />
        </div>
    );
}
