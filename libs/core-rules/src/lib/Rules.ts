import { PiecePlacement, PieceType } from '@michess/core-models';
import { IChessboard } from '@michess/core-state';

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
  chessboard: IChessboard,
  { piece, coord }: PiecePlacement
): Move[] => {
  const index = chessboard.getIndex(coord);
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
      const currSquare = chessboard.getSquare(
        chessboard.getCoordinates()[nextIndex]
      );
      const move: Move = {
        start: index,
        target: nextIndex,
      };
      if (!currSquare.piece) {
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
  chessboard: IChessboard,
  piecePlacement: PiecePlacement
): Move[] => {
  return getSlidingMoves(chessboard, piecePlacement);
};

const getMovesForBishop = (
  chessboard: IChessboard,
  piecePlacement: PiecePlacement
): Move[] => {
  return getSlidingMoves(chessboard, piecePlacement);
};

const getMovesForRook = (
  chessboard: IChessboard,
  piecePlacement: PiecePlacement
): Move[] => {
  return getSlidingMoves(chessboard, piecePlacement);
};

const getMovesFromSquare = (
  chessboard: IChessboard,
  piecePlacement: PiecePlacement
): Move[] => {
  switch (piecePlacement.piece.type) {
    case PieceType.Queen:
      return getMovesForQueen(chessboard, piecePlacement);
    case PieceType.Rook:
      return getMovesForRook(chessboard, piecePlacement);
    case PieceType.Pawn:
      return [];
    case PieceType.Knight:
      return [];
    case PieceType.King:
      return [];
    case PieceType.Bishop:
      return getMovesForBishop(chessboard, piecePlacement);
    default:
      throw new Error(`Invalid piece type: ${piecePlacement.piece.type}`);
  }
};

const getMoves = (chessboard: IChessboard): Move[] => {
  return chessboard.getPiecePlacements().flatMap((piecePlacement) => {
    return getMovesFromSquare(chessboard, piecePlacement);
  });
};

interface IRules {
  getMoves(): Move[];
}

export const Rules = (chessboard: IChessboard): IRules => {
  return {
    getMoves: () => getMoves(chessboard),
  };
};
