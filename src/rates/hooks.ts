import { useQuery } from '@tanstack/react-query';
import { fetchRates } from './api';
import { CurrenciesByCode, Currency, RatesDocument } from '../types';

export function useRatesQuery<T = RatesDocument>(
  select?: (data: RatesDocument) => T
) {
  return useQuery({
    queryKey: ['rates'],
    queryFn: fetchRates,
    staleTime: Infinity,
    cacheTime: 600_000, // 10 mins
    refetchOnWindowFocus: false,
    select,
  });
}

export const useRatesDocument = () => useRatesQuery();

export const useCurrenciesByCode = () =>
  useRatesQuery<CurrenciesByCode>((document) => document.currencies);

export const useCurrenciesList = () =>
  useRatesQuery<Currency[]>((document) => Object.values(document.currencies));
