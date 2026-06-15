import fs from 'fs';
const env = fs.readFileSync('.env.local', 'utf-8').split('\n').reduce((acc, line) => {
  const [k, ...v] = line.split('=');
  if (k && v.length) acc[k.trim()] = v.join('=').trim().replace(/^"|"$/g, '');
  return acc;
}, {});

const { createClient } = await import('@supabase/supabase-js');
const supabaseAdmin = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const { data: latestOrder, error } = await supabaseAdmin.from('orders')
    .select('id, payment_status, management_token')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

console.log("Latest Order:", latestOrder);
if (error) console.log("ERROR:", error);
