type TakeWhileIteratee<T> = (val: T) => boolean;

export const takeWhile = <T>(
  list: T[],
  iteratee: TakeWhileIteratee<T>
): T[] => {
  for (const [i, val] of list.entries())
    if (!iteratee(val)) return list.slice(0, i);
  return list;
};
