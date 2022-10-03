import type { NextApiRequest, NextApiResponse } from 'next';

const API_ENDPOINT = 'https://finnhub.io/api/v1';
const API_KEY = process.env.STOCKS_API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'OPTIONS') {
    return res.status(202).end();
  }

  const { symbols } = req.body;

  if (!symbols) {
    res.status(401).json({ error: 'Bad request' });
  }

  const response = await Promise.all(
    symbols.map(async (symbol: string) =>
      (
        await fetch(`${API_ENDPOINT}/quote?symbol=${symbol}&token=${API_KEY}`)
      ).json()
    )
  );
  const data = response.reduce((acc, cur, idx) => {
    acc[symbols[idx]] = cur;

    return acc;
  }, {});

  res.status(200).json(data);
}
