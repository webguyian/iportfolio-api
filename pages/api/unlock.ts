import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  unlocked: boolean;
  datetime: number;
};

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ unlocked: true, datetime: new Date().getTime() });
}
