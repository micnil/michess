import { Maybe, takeWhile } from '@michess/common-utils';
import {
  PiecePlacement,
  PieceType,
  SquareState,
} from '@michess/core-models';
import { IChessboard } from '@michess/core-state';

const DIAGONAL_OFFSETS = [7, -7, 9, -9];
const VERTICAL_OFFSETS = [8, -8];
const HORIZONTAL_OFFSETS = [1, -1];
const ADJECENT_OFFSETS = [...VERTICAL_OFFSETS, ...HORIZONTAL_OFFSETS];
const NEIGHBORING_OFFSETS = [...ADJECENT_OFFSETS, ...DIAGONAL_OFFSETS];

// type MoveTemp = {
//   from: number;
//   to: number;
//   capture: boolean;
//   promotion?: Pick<PieceType, 'q' | 'r' | 'b' | 'n'>;
//   castle:  Pick<PieceType, 'q' | 'k'>;
// }

type Move = {
  start: number;
  target: number;
  capture: boolean;
};

const withinBoard = (index: number): boolean => 0 <= index && index <= 63;

const isOutOfBoundsOrBlocked = (
  chessboard: IChessboard,
  index: number
): boolean => {
  if (withinBoard(index)) {
    const square = chessboard.getSquare(chessboard.getCoordinates()[index]);
    return square.piece?.color === chessboard.getState().turn;
  } else {
    return false;
  }
};

const getSquareFromOffset = (
  chessboard: IChessboard,
  from: number,
  offset: number
): Maybe<SquareState> => {
  const squareIndex = from + offset;
  if (withinBoard(squareIndex)) {
    return chessboard.getSquare(chessboard.getCoordinates()[squareIndex]);
  }
};

type Conditional = () => boolean;
type NextIteratee<T> = (prev: T) => T;

const unfoldDirection = (
  startIndex: number,
  directionOffset: number
): number[] => {
  const indexes: number[] = [];
  for (
    let nextIndex = startIndex + directionOffset;
    withinBoard(nextIndex);
    nextIndex = nextIndex + directionOffset
  ) {
    indexes.push(nextIndex);
  }
  return indexes;
};

const getSlidingMoves = (
  chessboard: IChessboard,
  { piece, coord }: PiecePlacement
): Move[] => {
  const index = chessboard.getIndex(coord);
  const coordinates = chessboard.getCoordinates();
  const moveOffsets =
    piece.type === PieceType.Bishop
      ? DIAGONAL_OFFSETS
      : piece.type === PieceType.Rook
      ? ADJECENT_OFFSETS
      : piece.type === PieceType.Queen
      ? NEIGHBORING_OFFSETS
      : [];

  const squares = moveOffsets.flatMap((offset) => {
    const potentialTargetSqaures = unfoldDirection(index, offset).map((index) =>
      chessboard.getSquare(coordinates[index])
    );
    return takeWhile(
      potentialTargetSqaures,
      (square) => square.piece?.color === chessboard.getState().turn
    );
  });

  const moves: Move[] = squares.map((square) => ({
    start: index,
    target: chessboard.getIndex(square.coord),
    capture: !!square.piece,
  }));

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

const getMovesForKing = (
  chessboard: IChessboard,
  { coord }: PiecePlacement
): Move[] => {
  const index = chessboard.getIndex(coord);
  const moveOffsets = NEIGHBORING_OFFSETS;
  const coordinates = chessboard.getCoordinates();

  const squares = moveOffsets
    .map((offset) => index + offset)
    .filter(withinBoard)
    .map((index) => chessboard.getSquare(coordinates[index]))
    .filter((square) => square.piece?.color === chessboard.getState().turn);

  const moves: Move[] = squares.map((square) => ({
    start: index,
    target: chessboard.getIndex(square.coord),
    capture: !!square.piece,
  }));

  return moves;
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
      return getMovesForKing(chessboard, piecePlacement);
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
