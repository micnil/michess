import ky, { KyInstance } from 'ky';

export type RestClient = KyInstance;

export const RestClient = {
  create: (): RestClient => {
    return ky.extend({
      prefixUrl: '/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};
