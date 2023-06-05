import { parseRates } from '../src/server/parseRates.ts';
import { RatesDocument } from '../src/types.ts';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const RATE_API_URL =
  'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt';

export async function fetchRates(): Promise<RatesDocument> {
  const response = await fetch(RATE_API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch rates');
  }
  const text = await response.text();
  return parseRates(text);
}

export default async function handler(
  _request: VercelRequest,
  response: VercelResponse
) {
  const rates = await fetchRates();
  response.setHeader('Cache-Control', `max-age=0, s-maxage=${60 * 30}, public`);
  return response.json(rates);
}
