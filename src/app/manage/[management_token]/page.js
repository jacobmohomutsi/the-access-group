import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { updateTicket } from './actions';

export const dynamic = 'force-dynamic';

export default async function ManageTicketsPage({ params }) {
    const { management_token } = await params;

    const { data: order } = await supabaseAdmin
        .from('orders')
        .select(`
            id, order_number, buyer_name, payment_status,
            tickets (
                id, ticket_number, assigned, emailed, 
                attendee_name, attendee_surname, attendee_email, qr_url,
                products ( name )
            )
        `)
        .eq('management_token', management_token)
        .single();

    if (!order) {
        notFound();
    }

    if (order.payment_status !== 'paid') {
        return (
            <div className="min-h-screen bg-gray-50 py-20 px-4 flex items-center justify-center">
                <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-100 max-w-md w-full">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Pending</h2>
                    <p className="text-gray-600">Your order is currently marked as {order.payment_status}. Tickets are not available yet.</p>
                </div>
            </div>
        );
    }

    const { tickets } = order;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border border-[#C2A66B]/30 p-8 mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Manage Your Tickets</h1>
                    <p className="text-gray-600">Order #{order.order_number} &bull; Hi {order.buyer_name}</p>
                </div>

                <div className="space-y-6">
                    {tickets.map(ticket => (
                        <div key={ticket.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-gray-900">{ticket.products.name}</h3>
                                    <p className="text-sm text-gray-500">Ticket #{ticket.ticket_number}</p>
                                </div>
                                <div>
                                    {ticket.assigned ? (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            Assigned
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                            Unassigned
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="p-6">
                                <form action={updateTicket} className="space-y-4">
                                    <input type="hidden" name="ticketId" value={ticket.id} />
                                    <input type="hidden" name="managementToken" value={management_token} />
                                    
                                    {ticket.assigned ? (
                                        <>
                                            <input type="hidden" name="actionType" value="resend" />
                                            <input type="hidden" name="currentName" value={ticket.attendee_name} />
                                            <input type="hidden" name="currentEmail" value={ticket.attendee_email} />
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100 mb-4">
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Attendee Name</p>
                                                    <p className="font-medium text-gray-900">{ticket.attendee_name} {ticket.attendee_surname}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Attendee Email</p>
                                                    <p className="font-medium text-gray-900">{ticket.attendee_email}</p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex gap-4">
                                                <button type="submit" className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
                                                    Resend Ticket
                                                </button>
                                                {/* Reassign logic could go here by showing the form instead */}
                                            </div>
                                            {ticket.emailed && (
                                                <p className="text-xs text-green-600 mt-2">Ticket has been emailed to the attendee.</p>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <input type="hidden" name="actionType" value="assign" />
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                                                    <input type="text" name="attendeeName" required 
                                                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#304945] focus:ring-[#304945] sm:text-sm py-2 px-3 border" />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Surname</label>
                                                    <input type="text" name="attendeeSurname" required 
                                                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#304945] focus:ring-[#304945] sm:text-sm py-2 px-3 border" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                                <input type="email" name="attendeeEmail" required 
                                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-[#304945] focus:ring-[#304945] sm:text-sm py-2 px-3 border" />
                                            </div>
                                            <div>
                                                <button type="submit" className="px-6 py-2 bg-[#304945] text-white rounded-lg font-semibold shadow-sm hover:bg-[#304945]/90 focus:ring-2 focus:ring-offset-2 focus:ring-[#304945]">
                                                    Assign & Send Ticket
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </form>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
