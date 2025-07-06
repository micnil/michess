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

const between = (board: bigint, start: Coordinate, end: Coordinate): bigint => {
  // https://www.chessprogramming.org/Square_Attacked_By#Pure_Calculation
  const m1 = -1n;
  const a2a7 = 0x0001010101010100n;
  const b2g7 = 0x0040201008040200n;
  const h1b7 = 0x0002040810204080n;
  const startIndex = Coordinate.toIndex(start);
  const endIndex = Coordinate.toIndex(end);
  const btwn = (m1 << BigInt(startIndex)) ^ (m1 << BigInt(endIndex));
  const file = (BigInt(endIndex) & 7n) - (BigInt(startIndex) & 7n);
  const rank = ((BigInt(endIndex) | 7n) - BigInt(startIndex)) >> 3n;
  let line = ((file & 7n) - 1n) & a2a7;
  line += 2n * (((rank & 7n) - 1n) >> 58n);
  line += (((rank - file) & 15n) - 1n) & b2g7;
  line += (((rank + file) & 15n) - 1n) & h1b7;
  line *= btwn & -btwn;
  return board | BigInt.asUintN(64, line & btwn);
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

/**
 * Returns the index (0-63) of the most significant set bit.
 * Returns -1 if board is 0n.
 */
const scanBackward = (board: bigint): number => {
  if (board === 0n) {
    return -1;
  } else {
    const msb = getHighestSetBit(board);
    return countBits(msb - 1n);
  }
};

const setCoord = (board: bigint, coord: Coordinate): bigint => {
  return setIndex(board, Coordinate.toIndex(coord));
};

const setIndex = (board: bigint, index: number): bigint => {
  return board | (1n << BigInt(index));
};

const setIndices = (initialBoard: bigint, indices: number[]): bigint => {
  return indices.reduce((board, index) => setIndex(board, index), initialBoard);
};

const invert = (board: bigint): bigint => {
  return ~board & ((1n << 64n) - 1n);
};

const isCoordSet = (board: bigint, coord: Coordinate): boolean => {
  return isIndexSet(board, Coordinate.toIndex(coord));
};

const isIndexSet = (board: bigint, index: number): boolean => {
  return !!(board & (1n << BigInt(index)));
};

const clearIndex = (board: bigint, index: number): bigint => {
  return board & ~(1n << BigInt(index));
};

const clearCoord = (board: bigint, coord: Coordinate): bigint => {
  return clearIndex(board, Coordinate.toIndex(coord));
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

const intersection = (a: bigint, b: bigint): bigint => a & b;

const leftShift = (board: bigint, shift: number): bigint => {
  return (board << BigInt(shift)) & ((1n << 64n) - 1n);
};

export type Bitboard = {
  countBits: () => number;
  scanForward: () => number;
  scanBackward: () => number;
  setCoord: (coord: Coordinate) => Bitboard;
  setIndex: (index: number) => Bitboard;
  setIndices: (indices: number[]) => Bitboard;
  clearCoord: (coord: Coordinate) => Bitboard;
  clearIndex: (index: number) => Bitboard;
  isCoordSet: (coord: Coordinate) => boolean;
  isIndexSet: (index: number) => boolean;
  isEmpty: () => boolean;
  getBitboardState: () => bigint;
  union: (other: Bitboard) => Bitboard;
  between: (start: Coordinate, end: Coordinate) => Bitboard;
  exclude: (other: Bitboard) => Bitboard;
  invert: () => Bitboard;
  intersection: (other: Bitboard) => Bitboard;
  toString: () => string;
  getLowestSetBit: () => bigint;
  getHighestSetBit: () => bigint;
  getIndices: () => number[];
  getCoordinates: () => Coordinate[];
  leftShift: (shift: number) => Bitboard;
};

export const Bitboard = (initialBoard?: bigint): Bitboard => {
  const board = initialBoard ?? 0n;

  return {
    countBits: () => countBits(board),
    scanForward: () => scanForward(board),
    scanBackward: () => scanBackward(board),
    setCoord: (coord: Coordinate) => Bitboard(setCoord(board, coord)),
    setIndex: (index: number) => Bitboard(setIndex(board, index)),
    setIndices: (indices: number[]) => Bitboard(setIndices(board, indices)),
    clearCoord: (coord: Coordinate) => Bitboard(clearCoord(board, coord)),
    clearIndex: (index: number) => Bitboard(clearIndex(board, index)),
    isCoordSet: (coord: Coordinate) => isCoordSet(board, coord),
    isIndexSet: (index: number) => isIndexSet(board, index),
    isEmpty: () => !board,
    getBitboardState: () => board,
    union: (other: Bitboard) => Bitboard(board | other.getBitboardState()),
    invert: () => Bitboard(invert(board)),
    exclude: (other: Bitboard) => Bitboard(board & ~other.getBitboardState()),
    between: (start: Coordinate, end: Coordinate) =>
      Bitboard(between(board, start, end)),
    intersection: (other: Bitboard) =>
      Bitboard(intersection(board, other.getBitboardState())),
    toString: () => bitboardToString(board),
    getLowestSetBit: () => getLowestSetBit(board),
    getHighestSetBit: () => getHighestSetBit(board),
    getIndices: () => getIndices(board),
    getCoordinates: () => {
      return getIndices(board).map((index) => Coordinate.fromIndex(index));
    },
    leftShift: (shift: number) => Bitboard(leftShift(board, shift)),
  };
};
