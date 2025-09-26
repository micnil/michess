import { QueryClient as TanstackQueryClient } from '@tanstack/react-query';

export const QueryClient = {
  create: (): TanstackQueryClient => {
    return new TanstackQueryClient({
      defaultOptions: {
        mutations: {
          retry: false,
        },
      },
    });
  },
};
