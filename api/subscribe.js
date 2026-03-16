export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { email, first_name, last_name } = req.body;
  
  const response = await fetch(
    'https://api.resend.com/audiences/a1712258-aa64-441b-be72-7383c58aa5bd/contacts',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, first_name, last_name }),
    }
  );
  
  if (response.ok) {
    res.status(200).json({ ok: true });
  } else {
    res.status(500).json({ ok: false });
  }
}
