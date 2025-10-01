import { ApiErrorData } from './ApiErrorData';

export type EventResponse<T> =
  | {
      status: 'ok';
      data: T;
    }
  | {
      status: 'error';
      error: ApiErrorData;
    };

export const EventResponse = {
  ok: <T>(data: T): EventResponse<T> => ({ status: 'ok', data }),
  error: <T = never>(error: ApiErrorData): EventResponse<T> => ({
    status: 'error',
    error,
  }),
};
