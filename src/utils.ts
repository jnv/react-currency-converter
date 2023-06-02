import { CURRENCY_FLAGS } from './config';

export function getCurrencyFlag(code: string): string {
  return CURRENCY_FLAGS[code] ?? '🏳️';
}
