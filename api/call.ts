// /api/call.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const client = twilio(accountSid, authToken);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const to = req.body.to || req.query.to;
  if (!to) return res.status(400).json({ error: '電話番号 (to) を指定してください' });

  try {
    const call = await client.calls.create({
      to,
      from: process.env.TWILIO_PHONE_NUMBER!,
      url: 'https://twilio-webhook-tau.vercel.app/api/voice',
      method: 'POST'
    });

    res.status(200).json({ message: '発信しました', sid: call.sid });
  } catch (error) {
    res.status(500).json({ error: '発信に失敗しました', details: error });
  }
}
