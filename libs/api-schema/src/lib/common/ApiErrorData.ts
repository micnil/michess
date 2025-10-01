export type ApiErrorData = {
  code: string;
  message: string;
  details?: any;
};

export const ApiErrorData = {
  isApiErrorData: (obj: any): obj is ApiErrorData => {
    return (
      obj &&
      typeof obj === 'object' &&
      typeof obj.code === 'string' &&
      typeof obj.message === 'string' &&
      (obj.details === undefined || typeof obj.details === 'object')
    );
  },
};
