import { CurrenciesByCode } from '../types';
import styled from 'styled-components';
import { getCurrencyFlag } from '../utils';
import { FormEvent, useState } from 'react';
import { FormEventHandler } from 'react';
import { convertAmountToCurrency } from '../rates/conversion';
import { useCurrenciesByCode } from '../rates/hooks';

const FORM_IDS = {
  form: 'conversion_form',
  amount: 'amount',
  currency: 'currency',
  output: 'output',
};

const ConverterWrapper = styled.div`
  border: thin solid #ccc;
  padding: 1em;
`;

const CurrencyForm = styled.form``;

const CurrencyInput = styled.input`
  width: 12ch;
  padding: 1ex;
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
  currencies: CurrenciesByCode;
  onChange: FormEventHandler<HTMLFormElement>;
};

function ConversionForm({ currencies, onChange }: FormProps) {
  const currenciesVals = Object.values(currencies);
  return (
    <CurrencyForm onChange={onChange} onSubmit={onChange} id={FORM_IDS.form}>
      <FormGroup>
        <label htmlFor={FORM_IDS.amount}>Convert</label>{' '}
        <CurrencyInput
          id={FORM_IDS.amount}
          name={FORM_IDS.amount}
          type="number"
          required
          min={0}
          defaultValue="0"
        />{' '}
        <label htmlFor={FORM_IDS.amount}>{getCurrencyFlag('CZK')} CZK</label>{' '}
        <label htmlFor={FORM_IDS.currency}>to</label>{' '}
        <CurrencySelect id={FORM_IDS.currency} name={FORM_IDS.currency}>
          {currenciesVals.map((currency) => (
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
  selectedCode: string;
  currencies: CurrenciesByCode;
};
function ConversionResult({
  amount,
  selectedCode,
  currencies,
}: ConversionResultProps) {
  const selectedCurrency = currencies[selectedCode];
  if (!selectedCurrency) {
    return null;
  }

  const result = convertAmountToCurrency(amount, selectedCurrency);

  return (
    <OutputWrapper>
      <FormLabel htmlFor={FORM_IDS.output}>Result: </FormLabel>
      <ConversionOutput
        form={FORM_IDS.form}
        htmlFor={`${FORM_IDS.amount} ${FORM_IDS.currency}`}
        id={FORM_IDS.output}
      >
        {result} {selectedCode}
      </ConversionOutput>
    </OutputWrapper>
  );
}

type ConverterProps = {
  currencies: CurrenciesByCode;
};

type ConversionInput = {
  amount: number;
  currency: string;
};

function CurrencyConverter({ currencies }: ConverterProps) {
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
        selectedCode={conversionInput.currency}
      />
    </ConverterWrapper>
  );
}

export default function CurrencyConverterWrapper() {
  const { data, error } = useCurrenciesByCode();

  if (error) {
    return (
      <ConverterWrapper>
        <p>
          Error:{' '}
          {error instanceof Error ? error.message : JSON.stringify(error)}
        </p>
      </ConverterWrapper>
    );
  }
  return <CurrencyConverter currencies={data || {}} />;
}
