// /api/call.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const fromNumber = process.env.TWILIO_PHONE_NUMBER!;

const client = twilio(accountSid, authToken);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { to } = req.body;

  if (!to) {
    res.status(400).json({ error: 'Missing "to" number in request body.' });
    return;
  }

  try {
    const call = await client.calls.create({
      url: 'https://twilio-webhook-tau.vercel.app/api/voice',
      to,
      from: fromNumber,
    });

    res.status(200).json({ message: 'Call initiated successfully.', sid: call.sid });
  } catch (error: any) {
    console.error('Twilio Call Error:', error);
    res.status(500).json({ error: 'Call initiation failed.', details: error.message });
  }
}
