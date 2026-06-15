import { supabaseAdmin } from '@/lib/supabase-admin';

export const revalidate = 0; // Disable caching

export default async function AdminDashboardPage() {
    // Fetch capacities
    const { data: events } = await supabaseAdmin.from('events').select('*');
    
    const eventStats = await Promise.all((events || []).map(async (event) => {
        const { data: rules } = await supabaseAdmin
            .from('product_event_rules')
            .select('product_id, quantity_required')
            .eq('event_id', event.id);

        let usedCapacity = 0;

        for (const rule of rules || []) {
            const { data: usedData } = await supabaseAdmin
                .from('order_items')
                .select('quantity, orders!inner(payment_status)')
                .eq('orders.payment_status', 'paid')
                .eq('product_id', rule.product_id);

            const qty = (usedData || []).reduce((sum, item) => sum + item.quantity, 0);
            usedCapacity += (qty * rule.quantity_required);
        }

        return {
            ...event,
            used: usedCapacity,
            remaining: event.capacity - usedCapacity,
            percentage: Math.round((usedCapacity / event.capacity) * 100)
        };
    }));

    // Fetch recent activity
    const { data: recentOrders } = await supabaseAdmin
        .from('orders')
        .select('id, order_number, buyer_name, total_amount, payment_status, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500">Overview of summit capacity and recent orders.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {eventStats.map((stat) => (
                    <div key={stat.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">{stat.name}</h3>
                                <p className="text-sm text-gray-500">Capacity Utilization</p>
                            </div>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                stat.percentage >= 90 ? 'bg-red-100 text-red-800' :
                                stat.percentage >= 75 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                            }`}>
                                {stat.percentage}% Full
                            </span>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                            <div className="bg-[#304945] h-2.5 rounded-full" style={{ width: `${Math.min(stat.percentage, 100)}%` }}></div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Total</p>
                                <p className="text-lg font-bold text-gray-900">{stat.capacity}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Used</p>
                                <p className="text-lg font-bold text-gray-900">{stat.used}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Remaining</p>
                                <p className="text-lg font-bold text-gray-900">{stat.remaining}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-6 py-3">Order Number</th>
                                <th className="px-6 py-3">Buyer</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders?.map((order) => (
                                <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {order.order_number}
                                    </td>
                                    <td className="px-6 py-4">
                                        {order.buyer_name}
                                    </td>
                                    <td className="px-6 py-4">
                                        R {order.total_amount}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            order.payment_status === 'paid' ? 'bg-green-100 text-green-800' :
                                            order.payment_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {order.payment_status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(order.created_at).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                            {(!recentOrders || recentOrders.length === 0) && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                        No recent orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
