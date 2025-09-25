import ky, { KyInstance } from 'ky';

export type RestClient = KyInstance;

export const RestClient = {
  create: (baseUrl?: string): RestClient => {
    return ky.extend({
      prefixUrl: baseUrl ? baseUrl + '/api' : '/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};
