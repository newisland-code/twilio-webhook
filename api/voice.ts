// /api/voice.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import { twiml } from 'twilio';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const response = new twiml.VoiceResponse();
  response.say('こんにちは。New Island株式会社の自動応答です。録音をどうぞ。');
  response.record({ maxLength: 20, action: '/api/recording' });

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(response.toString());
}
