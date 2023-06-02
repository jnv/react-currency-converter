import { RATE_API_URL } from '../config';
import { Currency } from '../types';

export async function fetchRates() {
  const response = await fetch(RATE_API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch rates');
  }
  const text = await response.text();
  return parseText(text);
}

const currencyProps = new Set([
  'country',
  'currency',
  'amount',
  'code',
  'rate',
]);
function isCurrencyProperty(header: string): header is keyof Currency {
  return currencyProps.has(header);
}

function parseText(text: string): Currency[] {
  const lines = text.split('\n');
  const headers = lines[1].split('|').map((header) => header.toLowerCase());

  const currencies: Currency[] = [];

  // Skip first 2 lines
  for (let i = 2; i < lines.length; i++) {
    const currentLine = lines[i].trim();
    if (!currentLine) {
      continue;
    }
    const values = currentLine.split('|');
    const currency: Record<string, string | number> = {};

    for (let j = 0; j < headers.length; j++) {
      const header = headers[j];
      if (isCurrencyProperty(header)) {
        const currentValue = values[j];
        const numValue = Number(currentValue);
        currency[header] = isNaN(numValue) ? currentValue : numValue;
      }
    }

    currencies.push(currency as Currency);
  }

  return currencies;
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  describe('parseText', () => {
    const inputShort = `02 Jun 2023 #106
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|14.561
Brazil|real|1|BRL|4.405
`;

    it('converts a text to currencies', () => {
      expect(parseText(inputShort)).toEqual([
        {
          country: 'Australia',
          currency: 'dollar',
          amount: 1,
          code: 'AUD',
          rate: 14.561,
        },
        {
          amount: 1,
          code: 'BRL',
          country: 'Brazil',
          currency: 'real',
          rate: 4.405,
        },
      ]);
    });
  });
}
