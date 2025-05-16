import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ChakraUIProvider } from '@/components/ui/provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';
import InterworkConnectionProvider from './providers/InterworkConnectionProvider.tsx';
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <InterworkConnectionProvider>
        <ChakraUIProvider>
          <App />
        </ChakraUIProvider>
      </InterworkConnectionProvider>
    </Provider>
  </QueryClientProvider>,
);
