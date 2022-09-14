import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  error: string;
};

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(400).json({ error: 'Bad request' });
}
