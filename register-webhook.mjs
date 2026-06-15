import fs from 'fs';

const env = fs.readFileSync('.env.local', 'utf-8').split('\n').reduce((acc, line) => {
  const [k, ...v] = line.split('=');
  if (k && v.length) acc[k.trim()] = v.join('=').trim().replace(/^"|"$/g, '');
  return acc;
}, {});

const token = env.YOCO_API_TOKEN || env.YOCO_SECRET_KEY;
if (!token) {
    console.error("No YOCO_API_TOKEN found in .env.local");
    process.exit(1);
}

const response = await fetch('https://payments.yoco.com/api/webhooks', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: "Ticketing Webhook (Ngrok)",
    url: "https://aeb1-102-32-108-21.ngrok-free.app/api/webhooks/yoco",
    events: ["payment.succeeded"]
  })
});

const data = await response.json();
console.log(JSON.stringify(data, null, 2));

if (data.secret) {
    console.log("\n\n>>> YOUR NEW WEBHOOK SECRET IS: ", data.secret);
}
