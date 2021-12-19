import { BoardState, Piece, PieceType } from '@michess/core-models';

const DIAGONAL_OFFSETS = [7, -7, 9, -9];
const VERTICAL_OFFSETS = [8, -8];
const HORIZONTAL_OFFSETS = [1, -1];
const ADJECENT_OFFSETS = [...VERTICAL_OFFSETS, ...HORIZONTAL_OFFSETS];
const NEIGHBORING_OFFSETS = [...ADJECENT_OFFSETS, ...DIAGONAL_OFFSETS];

type Move = {
  start: number;
  target: number;
};

const withinBoard = (index: number): boolean => 0 <= index && index <= 63;

const getSlidingMoves = (
  boardState: BoardState,
  index: number,
  piece: Piece
): Move[] => {
  const moveOffsets =
    piece.type === PieceType.Bishop
      ? DIAGONAL_OFFSETS
      : piece.type === PieceType.Rook
      ? ADJECENT_OFFSETS
      : piece.type === PieceType.Queen
      ? NEIGHBORING_OFFSETS
      : [];

  const moves: Move[] = [];
  for (const offset of moveOffsets) {
    for (
      let nextIndex = index + offset;
      withinBoard(nextIndex);
      nextIndex = nextIndex + offset
    ) {
      const currSquare = boardState.squares[nextIndex];
      const move: Move = {
        start: index,
        target: nextIndex,
      };
      if (currSquare.isEmpty) {
        moves.push(move);
      } else if (currSquare.piece.color !== piece.color) {
        moves.push(move);
      } else {
        break;
      }
    }
  }

  return moves;
};

const getMovesForQueen = (
  boardState: BoardState,
  index: number,
  piece: Piece
): Move[] => {
  return getSlidingMoves(boardState, index, piece);
};

const getMovesForBishop = (
  boardState: BoardState,
  index: number,
  piece: Piece
): Move[] => {
  return getSlidingMoves(boardState, index, piece);
};

const getMovesForRook = (
  boardState: BoardState,
  index: number,
  piece: Piece
): Move[] => {
  return getSlidingMoves(boardState, index, piece);
};

const getMovesFromSquare = (
  boardState: BoardState,
  index: number,
  piece: Piece
): Move[] => {
  switch (piece.type) {
    case PieceType.Queen:
      return getMovesForQueen(boardState, index, piece);
    case PieceType.Rook:
      return getMovesForRook(boardState, index, piece);
    case PieceType.Pawn:
      return [];
    case PieceType.Knight:
      return [];
    case PieceType.King:
      return [];
    case PieceType.Bishop:
      return getMovesForBishop(boardState, index, piece);
    default:
      throw new Error(`Invalid piece type: ${piece.type}`);
  }
};

const getMoves = (boardState: BoardState): Move[] => {
  return boardState.squares.flatMap((square, squareIndex) => {
    if (square.isEmpty) {
      return [];
    } else {
      return getMovesFromSquare(boardState, squareIndex, square.piece);
    }
  });
};

interface IRules {
  getMoves(): Move[];
}

export const Rules = (boardState: BoardState): IRules => {
  return {
    getMoves: () => getMoves(boardState),
  };
};
