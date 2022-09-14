import type { NextApiRequest, NextApiResponse } from 'next';

const API_ENDPOINT = 'https://finnhub.io/api/v1';
const API_KEY = process.env.STOCKS_API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { symbol, resolution, from, to } = req.query;
    const result = await fetch(
      `${API_ENDPOINT}/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${API_KEY}`
    );
    const data = await result.json();
    res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const { symbols, resolution, from, to } = req.body;
    const response = await Promise.all(
      symbols.map(async (symbol: string) =>
        (
          await fetch(
            `${API_ENDPOINT}/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${API_KEY}`
          )
        ).json()
      )
    );
    const data = response.reduce((acc, cur, idx) => {
      acc[symbols[idx]] = cur;

      return acc;
    }, {});

    res.status(200).json(data);
  }

  res.status(200).end();
}
