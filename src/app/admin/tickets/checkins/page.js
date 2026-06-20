import { supabaseAdmin } from '@/lib/supabase-admin';

export const revalidate = 0;

export default async function CheckInLogsPage({ searchParams }) {
    const params = await searchParams;
    const page = Number(params?.page) || 1;
    const search = params?.search || '';
    const sort = params?.sort || 'desc';
    const pageSize = 20;
    
    // We want to fetch checkins. Because we are searching, we might need to filter by ticket details.
    // Supabase allows filtering on joined tables.
    let query = supabaseAdmin
        .from('checkins')
        .select(`
            id, 
            checked_in_at,
            tickets!inner(ticket_number, attendee_name, attendee_surname),
            events(name)
        `, { count: 'exact' });

    if (search) {
        query = query.or(`ticket_number.ilike.%${search}%,attendee_name.ilike.%${search}%,attendee_surname.ilike.%${search}%`, { foreignTable: 'tickets' });
    }

    const { data: checkins, count } = await query
        .order('checked_in_at', { ascending: sort === 'asc' })
        .range((page - 1) * pageSize, page * pageSize - 1);

    const totalPages = Math.ceil((count || 0) / pageSize);

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Check-In Logs</h1>
                    <p className="text-gray-500">View real-time attendee check-ins.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                    <form className="flex flex-wrap sm:flex-nowrap gap-3 w-full max-w-2xl">
                        <input 
                            type="text" 
                            name="search"
                            defaultValue={search}
                            placeholder="Search by ticket # or name..." 
                            className="flex-1 text-gray-600 rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2 px-3 border min-w-[200px]"
                        />
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
                                <th className="px-6 py-3">Attendee</th>
                                <th className="px-6 py-3">Ticket #</th>
                                <th className="px-6 py-3">Event</th>
                                <th className="px-6 py-3">Check-In Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {checkins?.map((checkin) => (
                                <tr key={checkin.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-bold text-gray-900">
                                        {checkin.tickets?.attendee_name} {checkin.tickets?.attendee_surname}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-500">
                                        {checkin.tickets?.ticket_number}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800">
                                            {checkin.events?.name || 'Unknown Event'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {new Date(checkin.checked_in_at).toLocaleString(undefined, {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </td>
                                </tr>
                            ))}
                            {(!checkins || checkins.length === 0) && (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                                        No check-ins found matching your criteria.
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
                                <a href={`?page=${page - 1}&search=${search}&sort=${sort}`} className="px-3 py-1 border border-gray-300 rounded bg-white text-sm hover:bg-gray-50">
                                    Previous
                                </a>
                            )}
                            {page < totalPages && (
                                <a href={`?page=${page + 1}&search=${search}&sort=${sort}`} className="px-3 py-1 border border-gray-300 rounded bg-white text-sm hover:bg-gray-50">
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
