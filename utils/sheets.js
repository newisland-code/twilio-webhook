// server.ts
import express from 'express';
import { twiml } from 'twilio';

const app = express();
app.use(express.urlencoded({ extended: true }));

app.post('/voice', (req, res) => {
  const response = new twiml.VoiceResponse();
  response.say('こんにちは。New Islandの自動応答テストです。ご用件をお話しください。');
  response.record({ maxLength: 30, action: '/recording' });

  res.type('text/xml');
  res.send(response.toString());
});

app.post('/recording', (req, res) => {
  const response = new twiml.VoiceResponse();
  response.say('録音ありがとうございました。またご連絡いたします。');
  res.type('text/xml');
  res.send(response.toString());
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
