import { useQuery } from '@tanstack/react-query';
import { fetchRates } from './rates/api';

function App() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['rates'],
    queryFn: fetchRates,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default App;
