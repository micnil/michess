export type DisposableLock = {
  release: () => Promise<void>;
  [Symbol.asyncDispose]: () => Promise<void>;
};
