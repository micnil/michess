import React, { ReactNode, useMemo } from 'react';
import { Api } from '../Api';
import { AuthClient } from '../infra/AuthClient';
import { RestClient } from '../infra/RestClient';
import { SocketClient } from '../infra/SocketClient';
import { ApiContext } from './ApiContext';

interface ApiProviderProps {
  children: ReactNode;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const api = useMemo(
    () =>
      Api.create(
        RestClient.create(),
        AuthClient.create(),
        SocketClient.create(),
      ),
    [],
  );

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};
