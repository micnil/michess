import { Theme } from '@radix-ui/themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, RenderOptions } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { Api } from '../../app/api/Api';
import { ApiContext } from '../../app/api/context/ApiContext';
import { AuthClient } from '../../app/api/infra/AuthClient';
import { RestClient } from '../../app/api/infra/RestClient';
import { SocketClient } from '../../app/api/infra/SocketClient';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const api = Api.create(
  RestClient.create(window.location.origin),
  AuthClient.create(window.location.origin),
  SocketClient.create()
);

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ApiContext.Provider value={api}>
        <Theme>{children}</Theme>
      </ApiContext.Provider>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
