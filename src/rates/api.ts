import { RatesDocument } from '../types';

export async function fetchRates(): Promise<RatesDocument> {
  const response = await fetch('/api/rates', {
    headers: { accept: 'application/json' },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch rates');
  }
  return response.json();
}
