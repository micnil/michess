import { SQUARE_COORDINATES_WHITE } from '../constants/board';

export type Coordinate = (typeof SQUARE_COORDINATES_WHITE)[number];

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
  toFileIndex: (coord: Coordinate): number => {
    return coord.charCodeAt(0) - 97; // 'a' is 97 in ASCII
  },
  toRankIndex: (coord: Coordinate): number => {
    return 7 - (coord.charCodeAt(1) - 49); // '1' is 49 in ASCII
  },
  toFile: (coord: Coordinate): string => {
    return String.fromCharCode(coord.charCodeAt(0)); // Returns the file character
  },
  toRank: (coord: Coordinate): string => {
    return String.fromCharCode(coord.charCodeAt(1)); // Returns the rank character
  },

  toIndex: coordToIndex,
};
