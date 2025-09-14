import { useContext } from 'react';
import type { Api } from '../Api';
import { ApiContext } from '../context/ApiContext';

export const useApi = (): Api => {
  const api = useContext(ApiContext);

  if (!api) {
    throw new Error('useApi must be used within an ApiContext.Provider');
  }

  return api;
};
