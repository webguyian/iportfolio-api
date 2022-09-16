import { readFile } from 'fs/promises';
import formData from 'form-data';
import fomidable from 'formidable';
import Mailgun from 'mailgun.js';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  id: string;
  message: string;
};

type Fields = {
  attachment?: any;
  body: string;
  from: string;
  subject: string;
};

const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN!;
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY!
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'OPTIONS') {
    return res.status(202).end();
  }

  const form = new fomidable.IncomingForm();
  const fields: Fields = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);

      resolve({ ...(fields as Fields), ...files });
    });
  });
  const { attachment, body, from, subject } = fields;
  let file;

  if (attachment) {
    const data = await readFile(attachment.filepath);

    file = {
      filename: attachment.originalFilename,
      data
    };
  }

  try {
    const result = await mg.messages.create(MAILGUN_DOMAIN, {
      to: 'hello@webguyian.com',
      from: `iPortfolio User <${from}>`,
      subject,
      text: body,
      attachment: file
    });

    return res.status(200).json({
      id: result.id!,
      message: result.message!
    });
  } catch (err) {
    return res.status(400).end(err);
  }
}
