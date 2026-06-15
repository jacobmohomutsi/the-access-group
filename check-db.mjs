import fs from 'fs';

const env = fs.readFileSync('.env.local', 'utf-8').split('\n').reduce((acc, line) => {
  const [k, ...v] = line.split('=');
  if (k && v.length) acc[k.trim()] = v.join('=').trim().replace(/^"|"$/g, '');
  return acc;
}, {});

async function check() {
    // Check latest orders
    const res = await fetch(`${env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/orders?select=*&order=created_at.desc&limit=1`, {
        headers: {
            'apikey': env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
        }
    });
    const orders = await res.json();
    console.log("LATEST ORDER:");
    console.log(orders);

    if (orders.length > 0) {
        const orderId = orders[0].id;
        const res2 = await fetch(`${env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/tickets?order_id=eq.${orderId}&select=*`, {
            headers: {
                'apikey': env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
            }
        });
        const tickets = await res2.json();
        console.log("\nTICKETS FOR THIS ORDER:");
        console.log(tickets);
    }
}

check();
