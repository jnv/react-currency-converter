import { useQuery } from '@tanstack/react-query';
import { fetchRates } from './rates/api';
import CurrenciesTable from './components/CurrenciesTable';
import { CurrencyConverter } from './components/CurrencyConverter';
import {
  Column,
  Container,
  MainHeading,
  SectionHeading,
} from './components/Layout';

function App() {
  const { isLoading, error, data, isSuccess } = useQuery({
    queryKey: ['rates'],
    queryFn: fetchRates,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  if (isSuccess) {
    return (
      <Column>
        <MainHeading>Currency Converter</MainHeading>
        <CurrencyConverter currencies={data.currencies} />
        <section>
          <SectionHeading>Current Rates</SectionHeading>
          <CurrenciesTable />
        </section>

        <footer>
          <p>
            Data source:{' '}
            <a href="https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/">
              Czech National Bank exchange rate fixing
            </a>
          </p>
        </footer>
      </Column>
    );
  }

  return <div>Invalid state</div>;
}

export default function Wrapper() {
  return (
    <Container>
      <App />
    </Container>
  );
}
