import { supabaseAdmin } from '@/lib/supabase-admin';

export const revalidate = 0;

export default async function TicketsAdminPage({ searchParams }) {
    const params = await searchParams;
    const page = Number(params?.page) || 1;
    const search = params?.search || '';
    const status = params?.status || '';
    const sort = params?.sort || 'desc';
    const pageSize = 20;
    
    let query = supabaseAdmin
        .from('tickets')
        .select('*, products(name), orders(order_number, payment_status)', { count: 'exact' });

    if (search) {
        query = query.or(`ticket_number.ilike.%${search}%,attendee_email.ilike.%${search}%,attendee_name.ilike.%${search}%`);
    }

    if (status === 'assigned') {
        query = query.eq('assigned', true);
    } else if (status === 'unassigned') {
        query = query.eq('assigned', false);
    }

    const { data: tickets, count } = await query
        .order('created_at', { ascending: sort === 'asc' })
        .range((page - 1) * pageSize, page * pageSize - 1);

    const totalPages = Math.ceil((count || 0) / pageSize);

    return (
        <div>
            <div className="flex justify-between items-center mb-8 gap-4 flex-wrap">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Tickets</h1>
                    <p className="text-gray-500">Manage attendee tickets and assignment status.</p>
                </div>
                <a 
                    href={`/api/admin/export/tickets?search=${encodeURIComponent(search)}&status=${encodeURIComponent(status)}&sort=${encodeURIComponent(sort)}`}
                    className="bg-primary text-white px-4 py-2 rounded-lg font-bold hover:bg-primary/90 transition-colors shadow-sm text-sm"
                    download
                >
                    Export as CSV
                </a>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                    <form className="flex flex-wrap sm:flex-nowrap gap-3 w-full max-w-3xl">
                        <input 
                            type="text" 
                            name="search"
                            defaultValue={search}
                            placeholder="Search by ticket #, name, or email..." 
                            className="flex-1 text-gray-600 rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2 px-3 border min-w-[200px]"
                        />
                        <select 
                            name="status" 
                            defaultValue={status}
                            className="text-gray-600 rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2 px-3 border"
                        >
                            <option value="">All Statuses</option>
                            <option value="assigned">Assigned</option>
                            <option value="unassigned">Unassigned</option>
                        </select>
                        <select 
                            name="sort" 
                            defaultValue={sort}
                            className="text-gray-600 rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2 px-3 border"
                        >
                            <option value="desc">Newest First</option>
                            <option value="asc">Oldest First</option>
                        </select>
                        <button type="submit" className="px-5 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
                            Search
                        </button>
                    </form>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-white border-b">
                            <tr>
                                <th className="px-6 py-3">Ticket #</th>
                                <th className="px-6 py-3">Product</th>
                                <th className="px-6 py-3">Attendee</th>
                                <th className="px-6 py-3">Order</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets?.map((ticket) => (
                                <tr key={ticket.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-bold text-gray-900">
                                        {ticket.ticket_number}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {ticket.products?.name || 'Unknown'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {ticket.assigned ? (
                                            <div>
                                                <p className="font-medium text-gray-900">{ticket.attendee_name} {ticket.attendee_surname}</p>
                                                <p className="text-xs text-gray-500">{ticket.attendee_email}</p>
                                            </div>
                                        ) : (
                                            <span className="text-gray-400 italic">Unassigned</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {ticket.orders?.order_number || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {ticket.assigned ? (
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-800">
                                                Assigned
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-yellow-100 text-yellow-800">
                                                Unassigned
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {(!tickets || tickets.length === 0) && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                        No tickets found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && (
                    <div className="p-4 border-t border-gray-200 flex justify-between items-center bg-gray-50">
                        <span className="text-sm text-gray-700">
                            Showing page <span className="font-semibold">{page}</span> of <span className="font-semibold">{totalPages}</span>
                        </span>
                        <div className="flex gap-2">
                            {page > 1 && (
                                <a href={`?page=${page - 1}&search=${search}&status=${status}&sort=${sort}`} className="px-3 py-1 border border-gray-300 rounded bg-white text-sm hover:bg-gray-50">
                                    Previous
                                </a>
                            )}
                            {page < totalPages && (
                                <a href={`?page=${page + 1}&search=${search}&status=${status}&sort=${sort}`} className="px-3 py-1 border border-gray-300 rounded bg-white text-sm hover:bg-gray-50">
                                    Next
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
