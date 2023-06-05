export type Currency = {
  country: string;
  currency: string;
  amount: number;
  code: string;
  rate: number;
};

export type CurrenciesByCode = Record<string, Currency>;

export type RatesDocument = {
  date: string;
  sequence: number;
  currencies: CurrenciesByCode;
};
