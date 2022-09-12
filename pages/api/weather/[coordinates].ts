import type { NextApiRequest, NextApiResponse } from 'next';

const ENDPOINT = 'https://api.darksky.net/forecast';
const API_KEY = process.env.WEATHER_API_KEY;

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
    `${ENDPOINT}/${API_KEY}/${lat},${lon}?exclude=minutely,alerts,flags`
  );
  const data = await result.json();

  res.status(200).json(data);
}
