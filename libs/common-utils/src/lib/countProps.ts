/**
 * count the amount of props in an object and limit the count to maxCount.
 * Useful if you don't need to know whether the count is above a certain
 * threshold. More efficient that Object.keys(obj).length in that case.
 */
export const countProps = (obj: object, maxCount: number): number => {
  let count = 0;
  for (const key in obj) {
    if (count >= maxCount) {
      return count;
    }
    if (Object.hasOwn(obj, key)) {
      count++;
    }
  }
  return count;
};
