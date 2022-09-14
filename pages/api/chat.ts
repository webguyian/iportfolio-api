import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  from: string;
  id: string;
  message: string;
  timestamp: string;
};

const ENDPOINT = 'https://www.botlibre.com/rest/json/chat';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { message } = req.body;

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
    from: 'webguyian',
    id: data.conversation,
    message: data.message,
    timestamp: new Date().toISOString()
  });
}
