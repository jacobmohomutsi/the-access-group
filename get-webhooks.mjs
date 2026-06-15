import fs from 'fs';

const env = fs.readFileSync('.env.local', 'utf-8').split('\n').reduce((acc, line) => {
  const [k, ...v] = line.split('=');
  if (k && v.length) acc[k.trim()] = v.join('=').trim().replace(/^"|"$/g, '');
  return acc;
}, {});

const token = env.YOCO_API_TOKEN || env.YOCO_SECRET_KEY;

const response = await fetch('https://payments.yoco.com/api/webhooks', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const data = await response.json();
console.log(JSON.stringify(data, null, 2));
