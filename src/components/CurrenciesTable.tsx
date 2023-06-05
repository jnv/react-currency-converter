import styled from 'styled-components';
import { Currency } from '../types';
import { getCurrencyFlag } from '../utils';
import { useRatesDocument } from '../rates/hooks';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableCaption = styled.caption`
  padding: 0 0 1em;
  text-align: left;
`;

const Row = styled.tr`
  &:nth-child(odd) {
    background-color: #f2f2f2;
    @media (prefers-color-scheme: dark) {
      background-color: #333;
    }
  }
`;

const HeadRow = styled.tr``;

const Cell = styled.td`
  padding: 1ex;
`;

const HeadCell = styled(Cell)`
  font-weight: bold;
  text-align: left;
`;

type Props = {
  dateUpdated: string;
  currencies: Currency[];
};
function CurrenciesTable({ dateUpdated, currencies }: Props) {
  return (
    <Table>
      <TableCaption>Rates updated on {dateUpdated}</TableCaption>
      <thead>
        <HeadRow>
          <HeadCell>Country</HeadCell>
          <HeadCell>Currency</HeadCell>
          <HeadCell>Amount</HeadCell>
          <HeadCell>Code</HeadCell>
          <HeadCell>Rate</HeadCell>
        </HeadRow>
      </thead>
      <tbody>
        {currencies.map((currency) => (
          <Row key={currency.code}>
            <Cell>
              {getCurrencyFlag(currency.code)}&nbsp;
              {currency.country}
            </Cell>
            <Cell>{currency.currency}</Cell>
            <Cell>{currency.amount}</Cell>
            <Cell>{currency.code}</Cell>
            <Cell>{currency.rate}</Cell>
          </Row>
        ))}
      </tbody>
    </Table>
  );
}

export default function CurrenciesTableWrapper() {
  const { data, isSuccess, isError } = useRatesDocument();
  if (isError) {
    return <div>Failed to load conversion rates.</div>;
  }
  let currencies: Currency[] = [];
  let dateUpdated = '(loading)';

  if (isSuccess) {
    currencies = Object.values(data.currencies);
    dateUpdated = data.date;
  }
  return <CurrenciesTable dateUpdated={dateUpdated} currencies={currencies} />;
}
