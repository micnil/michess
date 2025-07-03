import { SQUARE_COORDINATES_WHITE } from './constants/board';

export type Coordinate = typeof SQUARE_COORDINATES_WHITE[number];

const coordToIndex = (coord: Coordinate): number => {
  const file = coord.charCodeAt(0) - 97;
  const rank = coord.charCodeAt(1) - 49;
  const index = file + (7 - rank) * 8;
  return index;
};

export const Coordinate = {
  fromIndex: (index: number): Coordinate => {
    return SQUARE_COORDINATES_WHITE[index];
  },

  toIndex: coordToIndex,
};
