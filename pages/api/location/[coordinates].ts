import type { NextApiRequest, NextApiResponse } from 'next';

const ENDPOINT = 'https://api.geocod.io/v1.7/reverse';
const API_KEY = process.env.LOCATION_API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { coordinates } = req.query;

  if (!coordinates) {
    return res.status(400).end('Bad request');
  }

  const [lat, lon] = (coordinates as string).split(',');
  const result = await fetch(
    `${ENDPOINT}?api_key=${API_KEY}&q=${lat},${lon}&limit=1`
  );
  const data = await result.json();
  const [location] = data.results;

  res.status(200).json(location);
}
