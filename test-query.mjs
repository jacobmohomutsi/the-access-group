import fs from 'fs';
const env = fs.readFileSync('.env.local', 'utf-8').split('\n').reduce((acc, line) => {
  const [k, ...v] = line.split('=');
  if (k && v.length) acc[k.trim()] = v.join('=').trim().replace(/^"|"$/g, '');
  return acc;
}, {});

const { createClient } = await import('@supabase/supabase-js');
const supabaseAdmin = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const { data: latestOrder } = await supabaseAdmin.from('orders').select('id, payment_status').eq('payment_status', 'paid').order('created_at', { ascending: false }).limit(1).single();

console.log("Latest Paid Order:", latestOrder);

if (latestOrder) {
    const { data: order, error } = await supabaseAdmin
        .from('orders')
        .select(`
            order_number, 
            buyer_name, 
            buyer_email, 
            total_amount, 
            management_token,
            order_items (
                quantity,
                products ( name )
            )
        `)
        .eq('id', latestOrder.id)
        .single();
        
    console.log("Order Query Result:", JSON.stringify(order, null, 2));
    if (error) console.log("ERROR:", error);
}
