import { Maybe } from '@michess/common-utils';
import {
  ChessPosition,
  Color,
  Coordinate,
  PieceType,
  CastlingAbility,
  Piece,
} from '@michess/core-models';

// Zobrist hash constants - using pre-generated deterministic 64-bit values
// These should be consistent across runs for reproducible hashing
const generateZobristValues = (seed: number, count: number): bigint[] => {
  const values: bigint[] = [];
  let state = seed;

  // Simple LCG (Linear Congruential Generator) for deterministic random numbers
  const lcg = (x: number) => (x * 1664525 + 1013904223) % Math.pow(2, 32);

  for (let i = 0; i < count; i++) {
    state = lcg(state);
    const high = BigInt(state);
    state = lcg(state);
    const low = BigInt(state);
    values.push((high << 32n) | low);
  }

  return values;
};

const ZOBRIST_PIECES: Record<Color, Record<PieceType, bigint[]>> = {
  white: {
    p: generateZobristValues(0x1234, 64),
    n: generateZobristValues(0x2345, 64),
    b: generateZobristValues(0x3456, 64),
    r: generateZobristValues(0x4567, 64),
    q: generateZobristValues(0x5678, 64),
    k: generateZobristValues(0x6789, 64),
  },
  black: {
    p: generateZobristValues(0x789a, 64),
    n: generateZobristValues(0x89ab, 64),
    b: generateZobristValues(0x9abc, 64),
    r: generateZobristValues(0xabcd, 64),
    q: generateZobristValues(0xbcde, 64),
    k: generateZobristValues(0xcdef, 64),
  },
};

// Zobrist hash for side to move (only one value needed - XOR when black to move)
const ZOBRIST_BLACK_TO_MOVE = 0x1d2c3b4a5f6e7d8cn;

// Zobrist hash for castling rights
const ZOBRIST_CASTLING: Record<CastlingAbility, bigint> = {
  [CastlingAbility.WhiteKing]: 0x9a8b7c6d5e4f3021n,
  [CastlingAbility.WhiteQueen]: 0x8b7c6d5e4f302918n,
  [CastlingAbility.BlackKing]: 0x7c6d5e4f30291827n,
  [CastlingAbility.BlackQueen]: 0x6d5e4f3029182736n,
};

// Zobrist hash for en passant files (8 values for files a-h)
const ZOBRIST_EN_PASSANT = [
  0x5e4f302918273645n,
  0x4f30291827364554n,
  0x3029182736455463n,
  0x2918273645546372n,
  0x1827364554637281n,
  0x2736455463728190n,
  0x364554637281909fn,
  0x54637281909fae8dn,
];

const computeInitialHash = (position: ChessPosition): bigint => {
  let hash = 0n;

  for (const [coord, piece] of Object.entries(position.pieces)) {
    const squareIndex = Coordinate.toIndex(coord as Coordinate);
    hash ^= ZOBRIST_PIECES[piece.color][piece.type][squareIndex];
  }

  if (position.turn === 'black') {
    hash ^= ZOBRIST_BLACK_TO_MOVE;
  }

  if (position.castlingAbility) {
    for (const ability of position.castlingAbility) {
      hash ^= ZOBRIST_CASTLING[ability];
    }
  }

  if (position.enPassant) {
    const file = Coordinate.toFileIndex(position.enPassant);
    hash ^= ZOBRIST_EN_PASSANT[file];
  }

  return hash;
};

const updateHashForPieceMove = (
  hash: bigint,
  piece: Piece,
  fromSquare: number,
  toSquare: number
): bigint => {
  // Remove piece from old square
  let newHash = hash ^ ZOBRIST_PIECES[piece.color][piece.type][fromSquare];
  // Add piece to new square
  newHash ^= ZOBRIST_PIECES[piece.color][piece.type][toSquare];
  return newHash;
};

const updateHashForCapture = (
  hash: bigint,
  capturedPiece: Maybe<Piece>,
  square: number
): bigint => {
  if (capturedPiece) {
    return (
      hash ^ ZOBRIST_PIECES[capturedPiece.color][capturedPiece.type][square]
    );
  } else {
    return hash;
  }
};

const updateHashForSideToMove = (hash: bigint): bigint => {
  return hash ^ ZOBRIST_BLACK_TO_MOVE;
};

const updateHashForCastlingRights = (
  hash: bigint,
  oldRights: Set<CastlingAbility>,
  newRights: Set<CastlingAbility>
): bigint => {
  let newHash = hash;

  if (newRights.symmetricDifference(oldRights).size == 0) {
    // Remove old rights
    for (const ability of oldRights) {
      newHash ^= ZOBRIST_CASTLING[ability];
    }

    // Add new rights
    for (const ability of newRights) {
      newHash ^= ZOBRIST_CASTLING[ability];
    }
  }

  return newHash;
};

const updateHashForEnPassant = (
  hash: bigint,
  oldEnPassant: Maybe<Coordinate>,
  newEnPassant: Maybe<Coordinate>
): bigint => {
  let newHash = hash;

  // Remove old en passant
  if (oldEnPassant) {
    const oldFile = Coordinate.toFileIndex(oldEnPassant);
    newHash ^= ZOBRIST_EN_PASSANT[oldFile];
  }

  // Add new en passant
  if (newEnPassant) {
    const newFile = Coordinate.toFileIndex(newEnPassant);
    newHash ^= ZOBRIST_EN_PASSANT[newFile];
  }

  return newHash;
};

const updateHashForPromotePawn = (
  hash: bigint,
  pawn: Piece,
  promotedPiece: Maybe<Piece>,
  square: number
): bigint => {
  if (promotedPiece) {
    // Remove the pawn from the square
    let newHash = hash ^ ZOBRIST_PIECES[pawn.color][pawn.type][square];
    // Add the promoted piece to the same square
    newHash ^= ZOBRIST_PIECES[promotedPiece.color][promotedPiece.type][square];
    return newHash;
  } else {
    return hash;
  }
};

const hashToString = (hash: bigint): string => {
  return `0x${hash.toString(16).padStart(16, '0')}`;
};

export type ZobristHash = {
  getValue: () => bigint;
  toString: () => string;
  movePiece: (
    piece: Piece,
    fromSquare: number,
    toSquare: number
  ) => ZobristHash;
  capturePiece: (capturedPiece: Maybe<Piece>, square: number) => ZobristHash;
  promotePawn: (
    pawn: Piece,
    promotedPiece: Maybe<Piece>,
    square: number
  ) => ZobristHash;
  toggleSideToMove: () => ZobristHash;
  updateCastlingRights: (
    oldRights: Set<CastlingAbility>,
    newRights: Set<CastlingAbility>
  ) => ZobristHash;
  updateEnPassant: (
    oldEnPassant: Maybe<Coordinate>,
    newEnPassant: Maybe<Coordinate>
  ) => ZobristHash;
  equals: (other: ZobristHash) => boolean;
  copy: () => ZobristHash;
};

const fromHash = (initialHash?: bigint): ZobristHash => {
  const hash = initialHash ?? 0n;

  return {
    getValue: () => hash,
    toString: () => hashToString(hash),
    movePiece: (piece, fromSquare, toSquare) =>
      fromHash(updateHashForPieceMove(hash, piece, fromSquare, toSquare)),
    capturePiece: (capturedPiece, square) =>
      fromHash(updateHashForCapture(hash, capturedPiece, square)),
    promotePawn: (pawn, promotedPiece, square) =>
      fromHash(updateHashForPromotePawn(hash, pawn, promotedPiece, square)),
    toggleSideToMove: () => fromHash(updateHashForSideToMove(hash)),
    updateCastlingRights: (oldRights, newRights) =>
      fromHash(updateHashForCastlingRights(hash, oldRights, newRights)),
    updateEnPassant: (oldEnPassant, newEnPassant) =>
      fromHash(updateHashForEnPassant(hash, oldEnPassant, newEnPassant)),
    equals: (other: ZobristHash) => hash === other.getValue(),
    copy: () => fromHash(hash),
  };
};

const fromChessPosition = (position: ChessPosition): ZobristHash => {
  const hash = computeInitialHash(position);
  return fromHash(hash);
};

export const ZobristHash = {
  fromHash,
  fromChessPosition,
};
