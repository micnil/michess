type ArrayAction<T> = {
  index: number;
  item: T;
};

export const insertItem = <T>(array: T[], action: ArrayAction<T>) => {
  return [
    ...array.slice(0, action.index),
    action.item,
    ...array.slice(action.index),
  ];
};

export const removeItem = <T>(array: T[], action: ArrayAction<T>) => {
  return [...array.slice(0, action.index), ...array.slice(action.index + 1)];
};

export const updateItem = <T>(array: T[], action: ArrayAction<T>) => {
  return [
    ...array.slice(0, action.index),
    action.item,
    ...array.slice(action.index + 1),
  ];
};
