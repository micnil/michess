import { unfold } from '../unfold';

describe('unfold', () => {
  it('unfolds a seed of 10 to a list with 10 elements where each value increaments by 10', () => {
    const iteratee = (seed: number): [number, number] | false =>
      seed <= 100 ? [seed, seed + 10] : false;
    expect(unfold(iteratee, 10)).toEqual([
      10, 20, 30, 40, 50, 60, 70, 80, 90, 100,
    ]);
  });
});
