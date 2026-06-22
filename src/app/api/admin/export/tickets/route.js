import { supabaseAdmin } from '@/lib/supabase-admin';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || '';
        const status = searchParams.get('status') || '';
        const sort = searchParams.get('sort') || 'desc';

        let query = supabaseAdmin
            .from('tickets')
            .select('*, products(name), orders(order_number, payment_status)');

        if (search) {
            query = query.or(`ticket_number.ilike.%${search}%,attendee_email.ilike.%${search}%,attendee_name.ilike.%${search}%`);
        }

        if (status === 'assigned') {
            query = query.eq('assigned', true);
        } else if (status === 'unassigned') {
            query = query.eq('assigned', false);
        }

        query = query.order('created_at', { ascending: sort === 'asc' });

        const { data: tickets, error } = await query;

        if (error) throw error;

        // Create CSV
        const headers = ['Ticket Number', 'Type', 'Attendee Name', 'Attendee Email', 'Company', 'Job Title', 'Status', 'Order Number', 'Payment Status', 'Created At'];
        
        const rows = tickets.map(t => [
            t.ticket_number,
            t.products?.name || 'N/A',
            t.attendee_name || '',
            t.attendee_email || '',
            t.company || '',
            t.job_title || '',
            t.assigned ? 'Assigned' : 'Unassigned',
            t.orders?.order_number || '',
            t.orders?.payment_status || '',
            new Date(t.created_at).toISOString().split('T')[0]
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
        ].join('\n');

        return new NextResponse(csvContent, {
            status: 200,
            headers: {
                'Content-Type': 'text/csv',
                'Content-Disposition': `attachment; filename="tickets-export-${new Date().toISOString().split('T')[0]}.csv"`,
            },
        });
    } catch (error) {
        console.error('Error exporting tickets:', error);
        return new NextResponse('Error generating export', { status: 500 });
    }
}
