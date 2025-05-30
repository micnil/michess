import { Coordinate } from '@michess/core-models';

const countBits = (board: bigint): number => {
  const left32 = Number(board & 0xffffffffn);
  const right32 = Number(board >> 32n);

  function count32(n: number) {
    n = n - ((n >> 1) & 0x55555555);
    n = (n & 0x33333333) + ((n >> 2) & 0x33333333);
    return (((n + (n >> 4)) & 0xf0f0f0f) * 0x1010101) >> 24;
  }

  return count32(left32) + count32(right32);
};

const scanForward = (board: bigint): number => {
  if (board === 0n) {
    return -1;
  } else {
    return countBits((board & -board) - 1n);
  }
};

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

export type Bitboard = {
  countBits: () => number;
  scanForward: () => number;
  setCoord: (coord: Coordinate) => Bitboard;
  setIndex: (index: number) => Bitboard;
  clearCoord: (coord: Coordinate) => Bitboard;
  clearIndex: (index: number) => Bitboard;
  isCoordSet: (coord: Coordinate) => boolean;
  isIndexSet: (index: number) => boolean;
  isEmpty: () => boolean;
  getBitboardState: () => bigint;
};

export const Bitboard = (initialBoard?: bigint): Bitboard => {
  const board = initialBoard ?? 0n;

  return {
    countBits: () => countBits(board),
    scanForward: () => scanForward(board),
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
