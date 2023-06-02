const UPSTREAM_RATE_URL =
  'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt';
export const RATE_API_URL =
  'https://corsproxy.io/?' + encodeURIComponent(UPSTREAM_RATE_URL);
