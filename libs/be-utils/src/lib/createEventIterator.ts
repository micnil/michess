import { EventEmitter } from 'events';
import { createEventIterable } from './createEventIterable';

export const createEventIterator = <T>(
  emitter: EventEmitter,
  eventType: string
): AsyncIterableIterator<T, T, undefined> & Disposable => {
  const iterable = createEventIterable<T>(emitter, eventType)[
    Symbol.asyncIterator
  ]();
  return {
    ...iterable,
    [Symbol.asyncIterator]() {
      return this;
    },
    [Symbol.dispose]: () => {
      if (iterable.return) {
        iterable.return();
      }
    },
  };
};
