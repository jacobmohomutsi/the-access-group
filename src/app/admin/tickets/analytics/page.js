import { supabaseAdmin } from '@/lib/supabase-admin';

export const revalidate = 0;

export default async function AnalyticsAdminPage() {
    // Analytics Data Fetching
    
    // 1. Total Revenue (Paid orders only)
    const { data: revenueData } = await supabaseAdmin
        .from('orders')
        .select('total_amount')
        .eq('payment_status', 'paid');
        
    const totalRevenue = revenueData?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;

    // 2. Orders count
    const { count: paidOrdersCount } = await supabaseAdmin
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('payment_status', 'paid');
        
    const { count: pendingOrdersCount } = await supabaseAdmin
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('payment_status', 'pending');

    // 3. Products Sold (Paid orders)
    const { data: itemsSold } = await supabaseAdmin
        .from('order_items')
        .select('quantity, products(name)')
        .eq('orders.payment_status', 'paid')
        // Using inner join on orders to filter by payment status
        .not('orders', 'is', null);

    // If supabase JS relation filter is tricky, we can do it via a view or multiple queries,
    // Since we need paid orders, let's fetch paid orders first, then items.
    
    const { data: paidOrders } = await supabaseAdmin
        .from('orders')
        .select('id')
        .eq('payment_status', 'paid');
        
    const paidOrderIds = paidOrders?.map(o => o.id) || [];
    
    let productSales = {};
    
    if (paidOrderIds.length > 0) {
        const { data: orderItems } = await supabaseAdmin
            .from('order_items')
            .select('quantity, products(name)')
            .in('order_id', paidOrderIds);
            
        orderItems?.forEach(item => {
            const name = item.products.name;
            if (!productSales[name]) productSales[name] = 0;
            productSales[name] += item.quantity;
        });
    }

    return (
        <div>
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
                    <p className="text-gray-500">Financial and ticket sales overview.</p>
                </div>
                {/* For CSV Export, we could add a client component button here that triggers an API route */}
            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Total Revenue</p>
                    <p className="text-4xl font-extrabold text-gray-900">R {totalRevenue.toLocaleString()}</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-green-200 p-6">
                    <p className="text-sm font-semibold text-green-700 uppercase tracking-wider mb-2">Paid Orders</p>
                    <p className="text-4xl font-extrabold text-green-900">{paidOrdersCount || 0}</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-yellow-200 p-6">
                    <p className="text-sm font-semibold text-yellow-700 uppercase tracking-wider mb-2">Pending Orders</p>
                    <p className="text-4xl font-extrabold text-yellow-900">{pendingOrdersCount || 0}</p>
                </div>
            </div>

            {/* Product Sales Breakdown */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <h3 className="text-lg font-bold text-gray-900">Ticket Sales Breakdown</h3>
                </div>
                <div className="p-6">
                    {Object.keys(productSales).length > 0 ? (
                        <div className="space-y-6">
                            {Object.entries(productSales).sort((a, b) => b[1] - a[1]).map(([name, qty]) => (
                                <div key={name} className="flex justify-between items-center">
                                    <span className="text-gray-700 font-medium">{name}</span>
                                    <span className="text-xl font-bold text-gray-900">{qty} sold</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 py-8">No ticket sales recorded yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
