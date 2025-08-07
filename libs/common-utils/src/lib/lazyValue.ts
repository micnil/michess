export const lazyValue = <T>(value: () => T): (() => T) => {
  let cachedValue: T | undefined;

  return () => {
    if (cachedValue === undefined) {
      cachedValue = value();
    }
    return cachedValue;
  };
};
