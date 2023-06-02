import { Currency } from '../types';
import styled from 'styled-components';
import { getCurrencyFlag } from '../utils';
import { FormEvent, useState } from 'react';
import { FormEventHandler } from 'react';

const CurrencyForm = styled.form``;

const CurrencyInput = styled.input`
  width: 10ch;
  padding: 1ex;
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

const FormGroup = styled.p``;

const FormLabel = styled.label``;

type FormProps = {
  currencies: Currency[];
  onChange: FormEventHandler<HTMLFormElement>;
};

function ConversionForm({ currencies, onChange }: FormProps) {
  return (
    <CurrencyForm onChange={onChange} onSubmit={onChange}>
      <FormGroup>
        <label htmlFor="amount">Convert</label>{' '}
        <CurrencyInput
          id="amount"
          name="amount"
          type="number"
          placeholder=""
          required
          min={0}
        />{' '}
        <label htmlFor="amount">{getCurrencyFlag('CZK')} CZK</label>{' '}
        <label htmlFor="currency">to</label>{' '}
        <CurrencySelect id="currency" name="currency">
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {getCurrencyFlag(currency.code)} {currency.code}
            </option>
          ))}
        </CurrencySelect>
      </FormGroup>
    </CurrencyForm>
  );
}

function ConversionResult({ amount, currency, currencies }) {
  return (
    <div>
      {amount} {currency}
    </div>
  );
}

type ConverterProps = {
  currencies: Currency[];
};

type ConversionInput = {
  amount: number;
  currency: string | undefined | null;
};

export function CurrencyConverter({ currencies }: ConverterProps) {
  const [conversionInput, setConversionInput] = useState<ConversionInput>({
    amount: 0,
    currency: '',
  });
  const formChangeHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setConversionInput({
      amount: Number(formData.get('amount')),
      currency: String(formData.get('currency')),
    });
  };

  return (
    <>
      <ConversionForm currencies={currencies} onChange={formChangeHandler} />
      <ConversionResult
        currencies={currencies}
        amount={conversionInput.amount}
        currency={conversionInput.currency}
      />
    </>
  );
}
