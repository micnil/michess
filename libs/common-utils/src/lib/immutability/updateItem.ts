import { ArrayAction } from "./ArrayAction";

export const updateItem = <T>(array: T[], action: ArrayAction<T>) => {
  return [
    ...array.slice(0, action.index),
    action.item,
    ...array.slice(action.index + 1),
  ];
};
