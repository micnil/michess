import { QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode, useMemo } from 'react';
import { QueryClient } from '../infra/QueryClient';

interface QueryProviderProps {
  children: ReactNode;
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  const queryClient = useMemo(() => QueryClient.create(), []);
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
