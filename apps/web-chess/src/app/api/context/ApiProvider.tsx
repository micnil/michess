import React, { ReactNode } from 'react';
import { Api } from '../Api';
import { AuthClient } from '../infra/AuthClient';
import { RestClient } from '../infra/RestClient';
import { SocketClient } from '../infra/SocketClient';
import { ApiContext } from './ApiContext';
import { AuthProvider } from './AuthProvider';
import { QueryProvider } from './QueryProvider';

interface ApiProviderProps {
  children: ReactNode;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const api = Api.create(
    RestClient.create(),
    AuthClient.create(),
    SocketClient.create()
  );

  return (
    <QueryProvider>
      <ApiContext.Provider value={api}>
        <AuthProvider>{children}</AuthProvider>
      </ApiContext.Provider>
    </QueryProvider>
  );
};
