import type { NextApiRequest, NextApiResponse } from 'next';

const ENDPOINT = 'https://api.napster.com/v2.2/tracks/top';
const API_KEY = process.env.MUSIC_API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { limit } = req.query;

  const result = await fetch(
    `${ENDPOINT}?apikey=${API_KEY}&limit=${limit || 5}`
  );
  const data = await result.json();

  res.status(200).json(data);
}
