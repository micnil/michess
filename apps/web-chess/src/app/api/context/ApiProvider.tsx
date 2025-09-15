import React, { ReactNode } from 'react';
import { Api } from '../Api';
import { authClient } from '../infra/authClient';
import { restClient } from '../infra/restClient';
import { socketClient } from '../infra/socketClient';
import { ApiContext } from './ApiContext';
import { AuthProvider } from './AuthProvider';
import { QueryProvider } from './QueryProvider';

interface ApiProviderProps {
  children: ReactNode;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const api = Api.create(restClient, authClient, socketClient);

  return (
    <QueryProvider>
      <ApiContext.Provider value={api}>
        <AuthProvider>{children}</AuthProvider>
      </ApiContext.Provider>
    </QueryProvider>
  );
};
