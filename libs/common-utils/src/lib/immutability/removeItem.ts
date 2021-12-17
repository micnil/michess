import { ArrayAction } from "./ArrayAction";

export const removeItem = <T>(array: T[], action: ArrayAction<T>) => {
  return [...array.slice(0, action.index), ...array.slice(action.index + 1)];
};