const res = await fetch('http://127.0.0.1:4040/api/requests/http');
const data = await res.json();
console.log(data.requests.map(r => ({
    method: r.request.method,
    uri: r.request.uri,
    status: r.response.status_code
})));
