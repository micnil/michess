import ky from 'ky';

export const restClient = ky.extend({
  prefixUrl: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
