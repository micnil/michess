import React, { ReactNode } from 'react';
import ky from 'ky';
import { ApiContext } from './ApiContext';
import { Api } from '../Api';
import { authClient } from '../infra/authClient';

interface ApiProviderProps {
  children: ReactNode;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  // Create API instances
  const restClient = ky.create({
    prefixUrl: 'http://localhost:3000/api', // Adjust this to your API base URL
  });

  const api = Api.create(restClient, authClient);

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};
