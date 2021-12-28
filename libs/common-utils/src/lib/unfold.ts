
type UnfoldIterator<Value, Seed> = (seed: Seed) => [Value, Seed] | false

export const unfold = <Value, Seed>(fn: UnfoldIterator<Value, Seed>, seed: Seed): Value[] => {
  let pair = fn(seed);
  const result = [];
  while (pair && pair.length) {
    result[result.length] = pair[0];
    pair = fn(pair[1]);
  }
  return result;
}