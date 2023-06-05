import { Currency } from '../types';

type CurrencyConversionSubset = Pick<Currency, 'amount' | 'rate'>;

export function convertAmountToCurrency(
  amountInCZK: number,
  { rate, amount: currencyAmount }: CurrencyConversionSubset
): number {
  const convertedAmount = (amountInCZK / rate) * currencyAmount;
  // https://stackoverflow.com/a/11832950/240963
  const roundedAmount =
    Math.round((convertedAmount + Number.EPSILON) * 100) / 100;

  return roundedAmount;
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  describe('convertAmountToCurrency', () => {
    it('converts and rounds amount to currency', () => {
      const inputCurrency = {
        country: 'Australia',
        currency: 'dollar',
        amount: 1,
        code: 'AUD',
        rate: 14.561,
      };
      const inputAmount = 100;
      const expected = 6.87;
      expect(convertAmountToCurrency(inputAmount, inputCurrency)).toEqual(
        expected
      );
    });

    it('handles currencies with larger amount', () => {
      const inputCurrency = {
        amount: 100,
        rate: 1.688,
      };
      const inputAmount = 100;
      const expected = 5_924.17;
      expect(convertAmountToCurrency(inputAmount, inputCurrency)).toEqual(
        expected
      );
    });

    it('handles zero input', () => {
      const inputCurrency = {
        amount: 100,
        rate: 1.688,
      };
      expect(convertAmountToCurrency(0, inputCurrency)).toEqual(0);
    });
  });
}
