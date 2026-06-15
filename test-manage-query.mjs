import fs from 'fs';
const env = fs.readFileSync('.env.local', 'utf-8').split('\n').reduce((acc, line) => {
  const [k, ...v] = line.split('=');
  if (k && v.length) acc[k.trim()] = v.join('=').trim().replace(/^"|"$/g, '');
  return acc;
}, {});

const { createClient } = await import('@supabase/supabase-js');
const supabaseAdmin = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const management_token = '370c46ec-e05d-48fe-b104-981a865882f7';

const { data: order, error } = await supabaseAdmin
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

console.log("Order:", order);
console.log("Error:", error);
