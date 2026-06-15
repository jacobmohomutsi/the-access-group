'use server'

import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { generateAndUploadQR } from '@/lib/services/qr';
import { sendTicketAssignment } from '@/lib/services/email';

export async function updateTicket(formData) {
    const ticketId = formData.get('ticketId');
    const managementToken = formData.get('managementToken');
    const attendeeName = formData.get('attendeeName');
    const attendeeSurname = formData.get('attendeeSurname');
    const attendeeEmail = formData.get('attendeeEmail');
    const actionType = formData.get('actionType'); // 'assign', 'reassign', 'resend'

    if (!ticketId || !managementToken) throw new Error("Missing credentials");

    // Verify ownership via management token
    const { data: ticket, error: ticketError } = await supabaseAdmin
        .from('tickets')
        .select(`
            id, ticket_number, assigned, qr_url,
            orders!inner(management_token),
            products(name),
            ticket_access(events(name, event_date, venue))
        `)
        .eq('id', ticketId)
        .eq('orders.management_token', managementToken)
        .single();

    if (ticketError || !ticket) {
        throw new Error("Ticket not found or unauthorized");
    }

    let currentQrUrl = ticket.qr_url;

    // If assigning or reassigning, update details and generate QR if not exists
    if (actionType === 'assign' || actionType === 'reassign') {
        if (!currentQrUrl) {
            currentQrUrl = await generateAndUploadQR(ticket.id, ticket.ticket_number);
        }

        const { error: updateError } = await supabaseAdmin
            .from('tickets')
            .update({
                attendee_name: attendeeName,
                attendee_surname: attendeeSurname,
                attendee_email: attendeeEmail,
                assigned: true,
                qr_url: currentQrUrl
            })
            .eq('id', ticketId);

        if (updateError) throw new Error("Failed to update ticket");

        // Log activity
        await supabaseAdmin.from('ticket_activity').insert({
            ticket_id: ticketId,
            action: actionType === 'assign' ? 'ticket_assigned' : 'ticket_reassigned',
            metadata: { name: attendeeName, email: attendeeEmail }
        });
    }

    // Determine target details
    const finalName = actionType === 'resend' ? formData.get('currentName') : attendeeName;
    const finalEmail = actionType === 'resend' ? formData.get('currentEmail') : attendeeEmail;

    // Send email
    const events = ticket.ticket_access.map(ta => ta.events);
    const emailSent = await sendTicketAssignment({
        attendeeName: finalName,
        attendeeEmail: finalEmail,
        ticketNumber: ticket.ticket_number,
        productName: ticket.products.name,
        qrUrl: currentQrUrl,
        events
    });

    if (emailSent) {
        await supabaseAdmin.from('tickets').update({ emailed: true }).eq('id', ticketId);
        await supabaseAdmin.from('ticket_activity').insert({
            ticket_id: ticketId,
            action: 'ticket_resent',
            metadata: { email: finalEmail }
        });
    }

    revalidatePath(`/manage/${managementToken}`);
}
