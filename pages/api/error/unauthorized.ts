import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  error: string;
};

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(401).json({ error: 'Unauthorized' });
}
