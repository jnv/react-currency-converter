import { Currency } from '../types';
import styled from 'styled-components';

const CurrencyForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CurrencyInput = styled.input`
  flex-grow: 1;
  padding: 1ex;
  margin-right: 10px;
`;

const CurrencySelect = styled.select`
  padding: 1ex;
`;

const ConvertButton = styled.button`
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
`;

type Props = {
  currencies: Currency[];
};

export function CurrencyConverter({ currencies }: Props) {
  return (
    <CurrencyForm>
      <CurrencyInput
        type="number"
        name="amount"
        placeholder="Enter amount in CZK"
        required
      />
      <CurrencySelect name="currency">
        {currencies.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.code}
          </option>
        ))}
      </CurrencySelect>
      <ConvertButton type="submit">Convert</ConvertButton>
    </CurrencyForm>
  );
}
