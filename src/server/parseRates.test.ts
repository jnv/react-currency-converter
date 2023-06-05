import { describe, it, expect } from 'vitest';
import { RatesDocument } from '../types';
import { parseRates } from './parseRates';

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
    expect(parseRates(inputShort)).toEqual(expected);
  });
});
