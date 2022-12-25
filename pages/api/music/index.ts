import type { NextApiRequest, NextApiResponse } from 'next';
import MUSIC_DATA from './data.json';

const ENDPOINT = 'https://api.napster.com/v2.2/genres/g.33/tracks/top';
const API_KEY = process.env.MUSIC_API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { limit } = req.query;

  const result = await fetch(
    `${ENDPOINT}?apikey=${API_KEY}&limit=${limit || 5}`
  );
  await result.json();

  res.status(200).json(MUSIC_DATA);
}
