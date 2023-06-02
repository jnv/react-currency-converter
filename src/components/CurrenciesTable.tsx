import styled from 'styled-components';
import { Currency } from '../types';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Row = styled.tr`
  &:nth-child(odd) {
    background-color: #f2f2f2;
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
  currencies: Currency[];
};
export function CurrenciesTable({ currencies }: Props) {
  return (
    <Table>
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
            <Cell>{currency.country}</Cell>
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
