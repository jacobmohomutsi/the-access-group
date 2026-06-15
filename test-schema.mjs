import fs from 'fs';

const env = fs.readFileSync('.env.local', 'utf-8').split('\n').reduce((acc, line) => {
  const [k, v] = line.split('=');
  if (k && v) acc[k.trim()] = v.trim();
  return acc;
}, {});

const res = await fetch(`${env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/orders`, {
  method: 'POST',
  headers: {
    'apikey': env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  },
  body: JSON.stringify({
    order_number: 'TEST-123',
    buyer_name: 'Test',
    buyer_surname: 'Test',
    buyer_email: 'test@test.com',
    buyer_phone: '1234567890',
    total_amount: 1500,
    payment_status: 'pending',
    quantity: 1
  })
});

const data = await res.json();
console.log(JSON.stringify(data, null, 2));
