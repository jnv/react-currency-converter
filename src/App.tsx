import CurrenciesTable from './components/CurrenciesTable';
import CurrencyConverter from './components/CurrencyConverter';
import {
  Column,
  Container,
  MainHeading,
  SectionHeading,
} from './components/Layout';

export default function App() {
  return (
    <Container>
      <MainHeading>Currency Converter</MainHeading>
      <CurrencyConverter />
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
    </Container>
  );
}
