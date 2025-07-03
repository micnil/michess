import { takeWhile } from '../takeWhile';

describe('takeWhile', () => {
  it('returns elements while the predicate is true', () => {
    const arr = [1, 2, 3, 4, 1, 2];
    const result = takeWhile(arr, (x) => x < 4);
    expect(result).toEqual([1, 2, 3]);
  });

  it('returns the whole array if all elements match', () => {
    const arr = [1, 2, 3];
    const result = takeWhile(arr, (x) => x < 10);
    expect(result).toEqual([1, 2, 3]);
  });

  it('returns an empty array if the first element does not match', () => {
    const arr = [5, 1, 2, 3];
    const result = takeWhile(arr, (x) => x < 4);
    expect(result).toEqual([]);
  });

  it('passes the index to the predicate', () => {
    const arr = [2, 4, 6, 8];
    const result = takeWhile(arr, (x, i) => i < 2);
    expect(result).toEqual([2, 4]);
  });
});
