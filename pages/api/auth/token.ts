import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

type Data = {
  expires: number;
  token: string;
};

const TOKEN_KEY = process.env.TOKEN_KEY!;

function getUnixTimetamp(date: Date) {
  return Math.floor(date.getTime() / 1000);
}

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const expires = getUnixTimetamp(tomorrow);
  const token = jwt.sign(
    {
      typ: 'access',
      nbf: getUnixTimetamp(today) - 1
    },
    TOKEN_KEY,
    {
      audience: 'webguyian.com',
      issuer: 'iPortfolio',
      expiresIn: '1d'
    }
  );
  res.status(200).json({ expires, token });
}
