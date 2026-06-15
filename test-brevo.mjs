import fs from 'fs';
const env = fs.readFileSync('.env.local', 'utf-8').split('\n').reduce((acc, line) => {
  const [k, ...v] = line.split('=');
  if (k && v.length) acc[k.trim()] = v.join('=').trim().replace(/^"|"$/g, '');
  return acc;
}, {});

const payload = {
    sender: {
        name: "The Access Group",
        email: "info@theaccessgroup.co.za"
    },
    to: [
        {
            email: "jacobmohomutsi@gmail.com",
            name: "Test"
        }
    ],
    subject: "Test Email",
    htmlContent: "<html><body><h1>Test</h1></body></html>"
};

const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "api-key": env.BREVO_API_KEY,
        "accept": "application/json"
    },
    body: JSON.stringify(payload)
});

const data = await response.json();
console.log("STATUS:", response.status);
console.log("RESPONSE:", data);
