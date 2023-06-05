import { RATE_API_URL } from '../config';
import { CurrenciesByCode, Currency, RatesDocument } from '../types';

export async function fetchRates(): Promise<RatesDocument> {
  const response = await fetch(RATE_API_URL, { referrerPolicy: 'no-referrer' });
  if (!response.ok) {
    console.log(response.status);
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

function parseText(text: string): RatesDocument {
  const lines = text.split('\n');
  const headers = lines[1].split('|').map((header) => header.toLowerCase());

  // Parse the metadata line
  const [date, sequence] = lines[0].split('#').map((segment) => segment.trim());

  const currencies: CurrenciesByCode = {};

  // Skip the metadata + header lines
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

    currencies[currency.code] = currency as Currency;
  }

  return {
    date,
    sequence: Number(sequence),
    currencies,
  };
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
      const expected: RatesDocument = {
        date: '02 Jun 2023',
        sequence: 106,
        currencies: {
          AUD: {
            country: 'Australia',
            currency: 'dollar',
            amount: 1,
            code: 'AUD',
            rate: 14.561,
          },
          BRL: {
            country: 'Brazil',
            currency: 'real',
            amount: 1,
            code: 'BRL',
            rate: 4.405,
          },
        },
      };
      expect(parseText(inputShort)).toEqual(expected);
    });
  });
}
