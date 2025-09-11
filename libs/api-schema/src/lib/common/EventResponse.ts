import { ApiError } from './ApiError';

export type EventResponse<T> =
  | {
      status: 'ok';
      data: T;
    }
  | {
      status: 'error';
      error: ApiError;
    };

export const EventResponse = {
  ok: <T>(data: T): EventResponse<T> => ({ status: 'ok', data }),
  error: <T = never>(error: ApiError): EventResponse<T> => ({
    status: 'error',
    error,
  }),
};
