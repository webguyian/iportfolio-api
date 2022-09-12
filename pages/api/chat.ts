import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
  conversation: string;
};

const ENDPOINT = 'https://www.botlibre.com/rest/json/chat';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { message } = req.body;

  if (req.method !== 'POST') {
    res.status(400).end('Bad request');
  }

  const result = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      application: process.env.CHAT_APP_ID,
      instance: process.env.CHAT_BOT_ID,
      user: process.env.CHAT_USER,
      password: process.env.CHAT_PASS,
      message: message || 'Hello'
    })
  });
  const data = await result.json();

  return res.status(200).json({
    message: data.message,
    conversation: data.conversation
  });
}
