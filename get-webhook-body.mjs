const res = await fetch('http://127.0.0.1:4040/api/requests/http');
const data = await res.json();
const postReq = data.requests.find(r => r.request.method === 'POST');
if (postReq) {
    console.log("REQUEST BODY:", Buffer.from(postReq.request.raw).toString('utf8'));
    console.log("RESPONSE BODY:", Buffer.from(postReq.response.raw).toString('utf8'));
} else {
    console.log("No POST requests found in ngrok logs.");
}
