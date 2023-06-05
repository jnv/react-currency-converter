import { useQuery } from '@tanstack/react-query';
import { fetchRates } from './rates/api';
import { CurrenciesTable } from './components/CurrenciesTable';
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
        <CurrencyConverter currencies={data} />
        <section>
          <SectionHeading>Current Rates</SectionHeading>
          <CurrenciesTable currencies={data} />
        </section>
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
