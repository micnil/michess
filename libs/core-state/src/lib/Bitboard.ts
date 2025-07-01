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

/**
 * Returns the index (0-63) of the least significant set bit.
 * Returns -1 if board is 0n.
 */
const scanForward = (board: bigint): number => {
  if (board === 0n) {
    return -1;
  } else {
    const lsb = getLowestSetBit(board);
    return countBits(lsb - 1n);
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

const invert = (board: bigint): bigint => {
  return ~board & ((1n << 64n) - 1n);
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

const getLowestSetBit = (board: bigint): bigint => {
  return board & -board;
};

const getHighestSetBit = (board: bigint): bigint => {
  if (board === 0n) return 0n;
  let b = board;
  // Shift right until only the highest bit remains
  b |= b >> 1n;
  b |= b >> 2n;
  b |= b >> 4n;
  b |= b >> 8n;
  b |= b >> 16n;
  b |= b >> 32n;
  return b & ~(b >> 1n);
};

const getIndices = (board: bigint): number[] => {
  const indices: number[] = [];
  let b = board;
  while (b !== 0n) {
    const lsb = getLowestSetBit(b);
    const idx = countBits(lsb - 1n);
    indices.push(idx);
    b = b & ~lsb;
  }
  return indices;
};

const bitboardToString = (board: bigint): string => {
  let result = '';
  for (let rank = 0; rank < 8; rank++) {
    let row = `${8 - rank}  `;
    for (let file = 0; file < 8; file++) {
      const index = file + rank * 8;
      row += isIndexSet(board, index) ? '1 ' : '. ';
    }
    result += row.trimEnd() + '\n';
  }
  result += '   a b c d e f g h';
  return result.trimEnd();
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
  union: (other: Bitboard) => Bitboard;
  invert: () => Bitboard;
  toString: () => string;
  getLowestSetBit: () => bigint;
  getHighestSetBit: () => bigint;
  getIndices: () => number[];
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
    union: (other: Bitboard) => Bitboard(board | other.getBitboardState()),
    invert: () => Bitboard(invert(board)),
    toString: () => bitboardToString(board),
    getLowestSetBit: () => getLowestSetBit(board),
    getHighestSetBit: () => getHighestSetBit(board),
    getIndices: () => getIndices(board),
  };
};
