import { supabaseAdmin } from '@/lib/supabase-admin';
import OrderActions from './OrderActions';

export const revalidate = 0;

export default async function OrdersAdminPage({ searchParams }) {
    const params = await searchParams;
    const page = Number(params?.page) || 1;
    const search = params?.search || '';
    const status = params?.status || '';
    const sort = params?.sort || 'desc';
    const pageSize = 20;

    let query = supabaseAdmin
        .from('orders')
        .select('*', { count: 'exact' });

    if (search) {
        query = query.or(`order_number.ilike.%${search}%,buyer_email.ilike.%${search}%,buyer_name.ilike.%${search}%`);
    }

    if (status) {
        query = query.eq('payment_status', status);
    }

    const { data: orders, count } = await query
        .order('created_at', { ascending: sort === 'asc' })
        .range((page - 1) * pageSize, page * pageSize - 1);

    const totalPages = Math.ceil((count || 0) / pageSize);

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
                    <p className="text-gray-500">Manage and view customer orders.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                    <form className="flex flex-wrap sm:flex-nowrap gap-3 w-full max-w-3xl">
                        <input
                            type="text"
                            name="search"
                            defaultValue={search}
                            placeholder="Search by order number, email, or name..."
                            className="flex-1 text-gray-600 rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2 px-3 border min-w-[200px]"
                        />
                        <select 
                            name="status" 
                            defaultValue={status}
                            className="text-gray-600 rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm py-2 px-3 border"
                        >
                            <option value="">All Statuses</option>
                            <option value="paid">Paid</option>
                            <option value="pending">Pending</option>
                            <option value="failed">Failed</option>
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
                                <th className="px-6 py-3">Order Number</th>
                                <th className="px-6 py-3">Buyer</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders?.map((order) => (
                                <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-bold text-gray-900">
                                        {order.order_number}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {order.buyer_name} {order.buyer_surname}
                                    </td>
                                    <td className="px-6 py-4">
                                        {order.buyer_email}
                                    </td>
                                    <td className="px-6 py-4">
                                        R {order.total_amount}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${order.payment_status === 'paid' ? 'bg-green-100 text-green-800' :
                                            order.payment_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                            {order.payment_status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {new Date(order.created_at).toLocaleString(undefined, {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </td>
                                    <td className="px-6 py-4 flex justify-end">
                                        <OrderActions order={order} />
                                    </td>
                                </tr>
                            ))}
                            {(!orders || orders.length === 0) && (
                                <tr>
                                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                                        No orders found matching your criteria.
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
