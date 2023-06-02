const UPSTREAM_RATE_URL =
  'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt';
export const RATE_API_URL =
  'https://corsproxy.io/?' + encodeURIComponent(UPSTREAM_RATE_URL);

export const CURRENCY_FLAGS: Record<string, string> = {
  AUD: '🇦🇺', // Australia
  BRL: '🇧🇷', // Brazil
  BGN: '🇧🇬', // Bulgaria
  CAD: '🇨🇦', // Canada
  CNY: '🇨🇳', // China
  CZK: '🇨🇿', // Czech Republic
  DKK: '🇩🇰', // Denmark
  EUR: '🇪🇺', // EMU
  HKD: '🇭🇰', // Hong Kong
  HUF: '🇭🇺', // Hungary
  ISK: '🇮🇸', // Iceland
  XDR: '🌐', // IMF
  INR: '🇮🇳', // India
  IDR: '🇮🇩', // Indonesia
  ILS: '🇮🇱', // Israel
  JPY: '🇯🇵', // Japan
  MYR: '🇲🇾', // Malaysia
  MXN: '🇲🇽', // Mexico
  NZD: '🇳🇿', // New Zealand
  NOK: '🇳🇴', // Norway
  PHP: '🇵🇭', // Philippines
  PLN: '🇵🇱', // Poland
  RON: '🇷🇴', // Romania
  SGD: '🇸🇬', // Singapore
  ZAR: '🇿🇦', // South Africa
  KRW: '🇰🇷', // South Korea
  SEK: '🇸🇪', // Sweden
  CHF: '🇨🇭', // Switzerland
  THB: '🇹🇭', // Thailand
  TRY: '🇹🇷', // Turkey
  GBP: '🇬🇧', // United Kingdom
  USD: '🇺🇸', // USA
};
