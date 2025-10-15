type TakeWhileIteratee<T> = (val: T, index: number) => boolean;

export const takeWhile = <T>(
  list: T[],
  iteratee: TakeWhileIteratee<T>,
  direction: 'forward' | 'backward' = 'forward',
): T[] => {
  if (direction === 'backward') {
    for (let i = list.length - 1; i >= 0; i--) {
      if (!iteratee(list[i], i)) return list.slice(i + 1);
    }
  } else {
    for (const [i, val] of list.entries())
      if (!iteratee(val, i)) return list.slice(0, i);
  }
  return list;
};
