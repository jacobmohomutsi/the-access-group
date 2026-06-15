import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function GET(request, { params }) {
    const resolvedParams = await params;
    const { ticket_number } = resolvedParams;

    if (!ticket_number) {
        return NextResponse.json({ error: 'Ticket number required' }, { status: 400 });
    }

    try {
        const { data: ticket, error } = await supabaseAdmin
            .from('tickets')
            .select(`
                id, ticket_number, assigned, 
                attendee_name, attendee_surname, attendee_email,
                products(name),
                orders!inner(payment_status),
                ticket_access(events(id, name, event_date, venue)),
                checkins(event_id, checked_in_at)
            `)
            .eq('ticket_number', ticket_number)
            .single();

        if (error || !ticket) {
            return NextResponse.json({ valid: false, message: 'Ticket not found' });
        }

        if (ticket.orders.payment_status !== 'paid') {
            return NextResponse.json({ valid: false, message: `Order is ${ticket.orders.payment_status}` });
        }

        if (!ticket.assigned) {
            return NextResponse.json({ valid: false, message: 'Ticket has not been assigned' });
        }

        return NextResponse.json({
            valid: true,
            ticket: {
                id: ticket.id,
                ticket_number: ticket.ticket_number,
                attendee: `${ticket.attendee_name} ${ticket.attendee_surname}`,
                product: ticket.products.name,
                events: ticket.ticket_access.map(ta => ({
                    id: ta.events.id,
                    name: ta.events.name,
                    date: ta.events.event_date,
                    venue: ta.events.venue,
                    checked_in: ticket.checkins.some(c => c.event_id === ta.events.id),
                    checked_in_at: ticket.checkins.find(c => c.event_id === ta.events.id)?.checked_in_at || null
                }))
            }
        });
    } catch (err) {
        console.error('Verify error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
