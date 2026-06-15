import fs from 'fs';

let envStr = fs.readFileSync('.env.local', 'utf-8');
const secret = 'whsec_MDYyQzlGM0ZFMUZCMjMyMjQyMDJENUJDNEM0OUY5MUE=';

if (envStr.includes('YOCO_WEBHOOK_SECRET=')) {
    envStr = envStr.replace(/YOCO_WEBHOOK_SECRET=.*/g, `YOCO_WEBHOOK_SECRET=${secret}`);
} else {
    envStr += `\nYOCO_WEBHOOK_SECRET=${secret}\n`;
}

fs.writeFileSync('.env.local', envStr);
console.log("Updated .env.local successfully!");
