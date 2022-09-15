import type { NextApiRequest, NextApiResponse } from 'next';
import formData from 'form-data';
import Mailgun from 'mailgun.js';

type Data = {
  id: string;
  message: string;
};

const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN!;
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY!
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'OPTIONS') {
    res.status(202).end();
  }

  const { body, from, subject } = req.body;

  try {
    const result = await mg.messages.create(MAILGUN_DOMAIN, {
      to: 'hello@webguyian.com',
      from: `iPortfolio User <${from}>`,
      subject,
      text: body
    });

    res.status(200).json({
      id: result.id!,
      message: result.message!
    });
  } catch (err) {
    res.status(400).end(err);
  }
}
