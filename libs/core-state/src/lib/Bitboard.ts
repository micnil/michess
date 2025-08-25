import { Coordinate } from '@michess/core-models';

// De Bruijn constants for scanForward
const DEBRUIJN64 = 0x03f79d71b4cb0a89n;
const INDEX64 = [
  0, 1, 48, 2, 57, 49, 28, 3, 61, 58, 50, 42, 38, 29, 17, 4, 62, 55, 59, 36, 53,
  51, 43, 22, 45, 39, 33, 30, 24, 18, 12, 5, 63, 47, 56, 27, 60, 41, 37, 16, 54,
  35, 52, 21, 44, 32, 23, 11, 46, 26, 40, 15, 34, 20, 31, 10, 25, 14, 19, 9, 13,
  8, 7, 6,
];

const countBits = (board: bigint): number => {
  // Brian Kernighan's algorithm - very fast for sparse bitboards
  // Each iteration clears the lowest set bit, so we only loop
  // for the number of set bits rather than all 64 bits
  let count = 0;
  let b = board;
  while (b !== 0n) {
    b = clearLowestSetBit(b);
    count++;
  }
  return count;
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
  }

  // De Bruijn multiplication with isolated LS1B
  // From Martin Läuter et al. (1997) via chess programming wiki
  // Source: https://www.chessprogramming.org/BitScan

  // LS1B isolation: bb & -bb isolates the least significant bit
  const isolated = board & -board;
  // Critical: mask the product to 64 bits to prevent overflow
  const product = (isolated * DEBRUIJN64) & 0xffffffffffffffffn;
  const hashIndex = Number(product >> 58n);
  return INDEX64[hashIndex];
};

/**
 * Returns the index (0-63) of the most significant set bit.
 * Returns -1 if board is 0n.
 */
const scanBackward = (board: bigint): number => {
  if (board === 0n) {
    return -1;
  }

  // Find the position of the MSB using binary search approach
  let index = 0;
  let b = board;

  if (b > 0xffffffffn) {
    index += 32;
    b >>= 32n;
  }
  if (b > 0xffffn) {
    index += 16;
    b >>= 16n;
  }
  if (b > 0xffn) {
    index += 8;
    b >>= 8n;
  }
  if (b > 0xfn) {
    index += 4;
    b >>= 4n;
  }
  if (b > 0x3n) {
    index += 2;
    b >>= 2n;
  }
  if (b > 0x1n) {
    index += 1;
  }

  return index;
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
  return ~board & 0xffffffffffffffffn;
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

const clearLowestSetBit = (board: bigint): bigint => {
  return board & (board - 1n);
};

const getHighestSetBit = (board: bigint): bigint => {
  if (board === 0n) {
    return 0n;
  }

  const msbIndex = scanBackward(board);
  return 1n << BigInt(msbIndex);
};

const getIndices = (board: bigint): number[] => {
  const indices: number[] = [];
  let b = board;
  while (b !== 0n) {
    const idx = scanForward(b);
    indices.push(idx);
    b = clearLowestSetBit(b);
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
  // Optimize for common case where shift is 0
  if (shift === 0) {
    return board;
  }
  // Optimize for cases where shift would overflow
  if (shift >= 64) {
    return 0n;
  }
  // Use single left shift and mask for 64-bit limit
  return (board << BigInt(shift)) & 0xffffffffffffffffn;
};

export class Bitboard {
  constructor(private board = 0n) {}

  countBits(): number {
    return countBits(this.board);
  }

  scanForward(): number {
    return scanForward(this.board);
  }

  scanBackward(): number {
    return scanBackward(this.board);
  }

  setCoord(coord: Coordinate): Bitboard {
    return new Bitboard(setCoord(this.board, coord));
  }

  setIndex(index: number): Bitboard {
    return new Bitboard(setIndex(this.board, index));
  }

  setIndices(indices: number[]): Bitboard {
    return new Bitboard(setIndices(this.board, indices));
  }

  clearCoord(coord: Coordinate): Bitboard {
    return new Bitboard(clearCoord(this.board, coord));
  }

  clearIndex(index: number): Bitboard {
    return new Bitboard(clearIndex(this.board, index));
  }

  isCoordSet(coord: Coordinate): boolean {
    return isCoordSet(this.board, coord);
  }

  isIndexSet(index: number): boolean {
    return isIndexSet(this.board, index);
  }

  isEmpty(): boolean {
    return !this.board;
  }

  getBitboardState(): bigint {
    return this.board;
  }

  union(other: Bitboard): Bitboard {
    return new Bitboard(this.board | other.getBitboardState());
  }

  invert(): Bitboard {
    return new Bitboard(invert(this.board));
  }

  exclude(other: Bitboard): Bitboard {
    return new Bitboard(this.board & ~other.getBitboardState());
  }

  between(start: Coordinate, end: Coordinate): Bitboard {
    return new Bitboard(between(this.board, start, end));
  }

  intersection(other: Bitboard): Bitboard {
    return new Bitboard(intersection(this.board, other.getBitboardState()));
  }

  toString(): string {
    return bitboardToString(this.board);
  }

  getLowestSetBit(): Bitboard {
    return new Bitboard(getLowestSetBit(this.board));
  }

  getHighestSetBit(): Bitboard {
    return new Bitboard(getHighestSetBit(this.board));
  }

  getIndices(): number[] {
    return getIndices(this.board);
  }

  getCoordinates(): Coordinate[] {
    return getIndices(this.board).map((index) => Coordinate.fromIndex(index));
  }

  leftShift(shift: number): Bitboard {
    return new Bitboard(leftShift(this.board, shift));
  }

  value(): bigint {
    return this.board;
  }
}
