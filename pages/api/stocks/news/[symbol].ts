import type { NextApiRequest, NextApiResponse } from 'next';

const API_ENDPOINT = 'https://finnhub.io/api/v1';
const API_KEY = process.env.STOCKS_API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { symbol } = req.query;
  const today = new Date();
  const todayFormatted = today.toISOString().split('T')[0];
  const lastMonth = new Date(new Date().setDate(today.getDate() - 30));
  const lastMonthFormatted = lastMonth.toISOString().split('T')[0];

  const result = await fetch(
    `${API_ENDPOINT}/company-news?symbol=${symbol}&from=${lastMonthFormatted}&to=${todayFormatted}&token=${API_KEY}`
  );
  const data = await result.json();

  res.status(200).json(data);
}
