/**
 * Simple Observable type - just a function that accepts a callback and returns an unsubscribe function
 */
export type Observable<T> = {
  subscribe: (callback: (value: T) => void) => () => void;
};
