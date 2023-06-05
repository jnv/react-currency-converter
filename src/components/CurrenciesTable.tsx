import styled from 'styled-components';
import { RatesDocument } from '../types';
import { getCurrencyFlag } from '../utils';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableCaption = styled.caption`
  caption-side: bottom;
  padding: 1em 0;
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
  ratesDocument: RatesDocument;
};
export function CurrenciesTable({ ratesDocument }: Props) {
  const currencies = Object.values(ratesDocument.currencies);
  return (
    <Table>
      <TableCaption>
        Rates updated on {ratesDocument.date} (#{ratesDocument.sequence})
      </TableCaption>
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
