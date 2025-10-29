export function assertEqual<T>(
  value: unknown,
  expected: T,
  msg?: string,
): asserts value is T {
  if (value !== expected) {
    throw new Error(msg ?? `Expected ${value} to equal ${expected}`);
  }
}
