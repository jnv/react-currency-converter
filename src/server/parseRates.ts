import { Currency, RatesDocument, CurrenciesByCode } from '../types';

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

export function parseRates(text: string): RatesDocument {
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
