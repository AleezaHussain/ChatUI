// src/app/api/chat/add/route.js
export async function POST(req) {
  const body = await req.json();

  const res = await fetch('http://18.143.79.95/api/chatSystem/chat/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
