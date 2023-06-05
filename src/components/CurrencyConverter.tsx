import { Currency } from '../types';
import styled from 'styled-components';
import { getCurrencyFlag } from '../utils';
import { FormEvent, useState } from 'react';
import { FormEventHandler } from 'react';
import { convertAmountToCurrency } from '../rates/conversion';

const FORM_IDS = {
  form: 'conversion_form',
  amount: 'amount',
  currency: 'currency',
  output: 'output',
};

const ConverterWrapper = styled.div`
  border: thin #ddd solid;
  padding: 1ex;
`;

const CurrencyForm = styled.form``;

const CurrencyInput = styled.input`
  width: 12ch;
  padding: 1ex 1em;
`;

const CurrencySelect = styled.select`
  padding: 1ex;
`;

const ConversionOutput = styled.output`
  font-weight: bold;
`;

const FormGroup = styled.div``;

const FormLabel = styled.label``;

const OutputWrapper = styled.div`
  margin-top: 1em;
`;

type FormProps = {
  currencies: Currency[];
  onChange: FormEventHandler<HTMLFormElement>;
};

function ConversionForm({ currencies, onChange }: FormProps) {
  return (
    <CurrencyForm onChange={onChange} onSubmit={onChange} id={FORM_IDS.form}>
      <FormGroup>
        <label htmlFor={FORM_IDS.amount}>Convert</label>{' '}
        <CurrencyInput
          id={FORM_IDS.amount}
          name={FORM_IDS.amount}
          type="number"
          placeholder=""
          required
          min={0}
        />{' '}
        <label htmlFor={FORM_IDS.amount}>{getCurrencyFlag('CZK')} CZK</label>{' '}
        <label htmlFor={FORM_IDS.currency}>to</label>{' '}
        <CurrencySelect id={FORM_IDS.currency} name={FORM_IDS.currency}>
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

type ConversionResultProps = {
  amount: number;
  selectedCurrency: string;
  currencies: Currency[];
};
function ConversionResult({
  amount,
  selectedCurrency,
  currencies,
}: ConversionResultProps) {
  if (!selectedCurrency) {
    return null;
  }
  const selectedCurrencyEntry = currencies.find(
    (currency) => currency.code === selectedCurrency
  );
  if (!selectedCurrencyEntry) {
    return null;
  }

  const result = convertAmountToCurrency(amount, selectedCurrencyEntry);

  return (
    <OutputWrapper>
      <FormLabel htmlFor={FORM_IDS.output}>Result: </FormLabel>
      <ConversionOutput
        form={FORM_IDS.form}
        htmlFor={`${FORM_IDS.amount} ${FORM_IDS.currency}`}
        id={FORM_IDS.output}
      >
        {result} {selectedCurrency}
      </ConversionOutput>
    </OutputWrapper>
  );
}

type ConverterProps = {
  currencies: Currency[];
};

type ConversionInput = {
  amount: number;
  currency: string;
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
      amount: Number(formData.get('amount')) || 0,
      currency: String(formData.get('currency')),
    });
  };

  return (
    <ConverterWrapper>
      <ConversionForm currencies={currencies} onChange={formChangeHandler} />
      <ConversionResult
        currencies={currencies}
        amount={conversionInput.amount}
        selectedCurrency={conversionInput.currency}
      />
    </ConverterWrapper>
  );
}
