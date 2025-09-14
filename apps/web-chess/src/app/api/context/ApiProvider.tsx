import React, { ReactNode } from 'react';
import { Api } from '../Api';
import { authClient } from '../infra/authClient';
import { restClient } from '../infra/restClient';
import { ApiContext } from './ApiContext';

interface ApiProviderProps {
  children: ReactNode;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const api = Api.create(restClient, authClient);

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};
