import { useQuery } from '@tanstack/react-query';
import { fetchRates } from './rates/api';
import { CurrenciesTable } from './components/CurrenciesTable';

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
    return <CurrenciesTable currencies={data} />;
  }

  return <div>Invalid state</div>;
}

export default App;
