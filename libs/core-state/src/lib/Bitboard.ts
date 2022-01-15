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

export const Bitboard = () => {
  const board = 0n;

  return {
    setCoord: (coord: Coordinate) => setCoord(board, coord),
    setIndex: (index: number) => setIndex(board, index),
  };
};
