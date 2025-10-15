import { EventEmitter } from 'events';

export function createEventIterable<T>(
  emitter: EventEmitter,
  eventType: string,
): AsyncIterable<T, T, undefined> {
  return {
    [Symbol.asyncIterator](): AsyncIterator<T> {
      const eventQueue: T[] = [];
      const resolverQueue: Array<(value: IteratorResult<T>) => void> = [];
      let isListening = true;

      const eventHandler = (data: T) => {
        const resolve = resolverQueue.shift();
        if (resolve) {
          resolve({ value: data, done: false });
        } else {
          eventQueue.push(data);
        }
      };

      emitter.on(eventType, eventHandler);

      return {
        async next(): Promise<IteratorResult<T>> {
          if (!isListening) {
            return { done: true, value: undefined };
          }
          const value = eventQueue.shift();
          if (value) {
            return { value, done: false };
          }

          return new Promise<IteratorResult<T>>((resolve) => {
            resolverQueue.push(resolve);
          });
        },

        async return(): Promise<IteratorResult<T>> {
          isListening = false;
          emitter.off(eventType, eventHandler);
          resolverQueue.forEach((resolve) =>
            resolve({ done: true, value: undefined }),
          );
          return { done: true, value: undefined };
        },
      };
    },
  };
}
