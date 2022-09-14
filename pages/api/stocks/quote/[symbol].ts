import type { NextApiRequest, NextApiResponse } from 'next';

const API_ENDPOINT = 'https://finnhub.io/api/v1';
const API_KEY = process.env.STOCKS_API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { symbol } = req.query;

  const result = await fetch(
    `${API_ENDPOINT}/quote?symbol=${symbol}&token=${API_KEY}`
  );
  const data = await result.json();

  res.status(200).json(data);
}
