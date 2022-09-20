import { Coordinate } from '@michess/core-models';

const coordToIndex = (coord: Coordinate): number => {
  const file = coord.charCodeAt(0) - 97;
  const rank = coord.charCodeAt(1) - 49;
  return file + (7 - rank) * 8;
};

const setCoord = (board: bigint, coord: Coordinate): bigint => {
  return setIndex(board, coordToIndex(coord));
};

const setIndex = (board: bigint, index: number): bigint => {
  return board | (1n << BigInt(index));
};

const isCoordSet = (board: bigint, coord: Coordinate): boolean => {
  return isIndexSet(board, coordToIndex(coord));
};

const isIndexSet = (board: bigint, index: number): boolean => {
  return !!(board & (1n << BigInt(index)));
};

const clearIndex = (board: bigint, index: number): bigint => {
  return board & ~(1n << BigInt(index));
};

const clearCoord = (board: bigint, coord: Coordinate): bigint => {
  return clearIndex(board, coordToIndex(coord));
};

export const Bitboard = (initialBoard?: bigint) => {
  const board = initialBoard ?? 0n;

  return {
    setCoord: (coord: Coordinate) => Bitboard(setCoord(board, coord)),
    setIndex: (index: number) => Bitboard(setIndex(board, index)),
    clearCoord: (coord: Coordinate) => Bitboard(clearCoord(board, coord)),
    clearIndex: (index: number) => Bitboard(clearIndex(board, index)),
    isCoordSet: (coord: Coordinate) => isCoordSet(board, coord),
    isIndexSet: (index: number) => isIndexSet(board, index),
    isEmpty: () => !board,
    getBitboardState: () => board,
  };
};
