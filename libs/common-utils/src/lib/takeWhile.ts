type TakeWhileIteratee<T> = (val: T, index: number) => boolean;

export const takeWhile = <T>(
  list: T[],
  iteratee: TakeWhileIteratee<T>
): T[] => {
  for (const [i, val] of list.entries())
    if (!iteratee(val, i)) return list.slice(0, i);
  return list;
};
