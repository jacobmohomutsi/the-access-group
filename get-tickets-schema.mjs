const res = await fetch('http://127.0.0.1:4040/api/tunnels');
import fs from 'fs';
const env = fs.readFileSync('.env.local', 'utf-8').split('\n').reduce((acc, line) => {
  const [k, ...v] = line.split('=');
  if (k && v.length) acc[k.trim()] = v.join('=').trim().replace(/^"|"$/g, '');
  return acc;
}, {});

const q = await fetch(`${env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/tickets?limit=1`, {
  headers: {
    'apikey': env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
  }
});
const data = await q.json();
console.log("TICKETS TABLE ROW FORMAT:");
console.log(data);
