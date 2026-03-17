export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, first_name, last_name } = req.body;

  // Add to Resend audience
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

  if (!response.ok) {
    return res.status(500).json({ ok: false });
  }

  // Add to Loops
  try {
    await fetch('https://app.loops.so/api/v1/contacts/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.LOOPS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        firstName: first_name,
        lastName: last_name,
        source: 'tylerbohall-checklist'
      }),
    });
  } catch (err) {
    console.error('LOOPS_ERR', err);
  }

  res.status(200).json({ ok: true });
}
