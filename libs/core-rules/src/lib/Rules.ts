import { takeWhile } from '@michess/common-utils';
import {
  Color,
  PiecePlacement,
  PiecePlacements,
  PieceType,
} from '@michess/core-models';
import { IChessGame } from './model/IChessGame';
import { Move } from './model/Move';
import { ChessGame } from './ChessGame';

const DIAGONAL_OFFSETS = [7, -7, 9, -9];
const VERTICAL_OFFSETS = [8, -8];
const HORIZONTAL_OFFSETS = [1, -1];
const ADJECENT_OFFSETS = [...VERTICAL_OFFSETS, ...HORIZONTAL_OFFSETS];
const NEIGHBORING_OFFSETS = [...ADJECENT_OFFSETS, ...DIAGONAL_OFFSETS];

const KNIGHT_JUMP_OFFSETS = [15, 17, -17, -15, 10, -6, 6, -10];

// type MoveTemp = {
//   from: number;
//   to: number;
//   capture: boolean;
//   promotion?: Pick<PieceType, 'q' | 'r' | 'b' | 'n'>;
//   castle:  Pick<PieceType, 'q' | 'k'>;
// }

const withinBoard = (index: number): boolean => 0 <= index && index <= 63;

const chebyshevDistance = (startIndex: number, nextIndex: number) => {
  const startFile = startIndex % 8;
  const nextFile = nextIndex % 8;
  const startRank = (startIndex - startFile) / 8;
  const nextRank = (nextIndex - nextFile) / 8;

  return Math.max(
    Math.abs(startRank - nextRank),
    Math.abs(startFile - nextFile)
  );
};

const isNeighbors = (startIndex: number, nextIndex: number) => {
  return chebyshevDistance(startIndex, nextIndex) <= 1;
};

const unfoldDirection = (
  startIndex: number,
  directionOffset: number
): number[] => {
  const indexes: number[] = [];
  for (
    let currentIndex = startIndex, nextIndex = startIndex + directionOffset;
    withinBoard(nextIndex) && isNeighbors(currentIndex, nextIndex);
    currentIndex = nextIndex, nextIndex = nextIndex + directionOffset
  ) {
    indexes.push(nextIndex);
  }
  return indexes;
};

const getSlidingMoves = (
  chessboard: IChessGame,
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
    return takeWhile(potentialTargetSqaures, (square, index) => {
      const squareNotOccupiedWithSameColoredPiece =
        square.piece?.color !== piece.color;

      const previousSquare =
        index !== 0 ? potentialTargetSqaures[index - 1] : undefined;
      const previousSquareNotOccupiedWithDifferentColoredPiece =
        !!previousSquare?.piece && previousSquare?.piece?.color !== piece.color;

      return (
        squareNotOccupiedWithSameColoredPiece &&
        !previousSquareNotOccupiedWithDifferentColoredPiece
      );
    });
  });

  const moves: Move[] = squares.map((square) => ({
    start: index,
    target: chessboard.getIndex(square.coord),
    capture: !!square.piece,
  }));

  return moves;
};

const getMovesForQueen = (
  chessboard: IChessGame,
  piecePlacement: PiecePlacement
): Move[] => {
  return getSlidingMoves(chessboard, piecePlacement);
};

const getMovesForBishop = (
  chessboard: IChessGame,
  piecePlacement: PiecePlacement
): Move[] => {
  return getSlidingMoves(chessboard, piecePlacement);
};

const getMovesForRook = (
  chessboard: IChessGame,
  piecePlacement: PiecePlacement
): Move[] => {
  return getSlidingMoves(chessboard, piecePlacement);
};

const getMovesForKing = (
  chessboard: IChessGame,
  { coord, piece }: PiecePlacement
): Move[] => {
  const index = chessboard.getIndex(coord);
  const moveOffsets = NEIGHBORING_OFFSETS;
  const coordinates = chessboard.getCoordinates();

  const squares = moveOffsets
    .map((offset) => index + offset)
    .filter(
      (nextIndex) => withinBoard(nextIndex) && isNeighbors(index, nextIndex)
    )
    .map((index) => chessboard.getSquare(coordinates[index]))
    .filter((square) => square.piece?.color !== piece.color);

  const moves: Move[] = squares.map((square) => ({
    start: index,
    target: chessboard.getIndex(square.coord),
    capture: !!square.piece,
  }));

  return moves;
};

const getMovesForKnight = (
  chessboard: IChessGame,
  { coord, piece }: PiecePlacement
): Move[] => {
  const index = chessboard.getIndex(coord);
  const moveOffsets = KNIGHT_JUMP_OFFSETS;
  const coordinates = chessboard.getCoordinates();

  const squares = moveOffsets
    .map((offset) => index + offset)
    .filter(
      (nextIndex) =>
        withinBoard(nextIndex) && chebyshevDistance(index, nextIndex) <= 2
    )
    .map((index) => chessboard.getSquare(coordinates[index]))
    .filter((square) => square.piece?.color !== piece.color);

  const moves: Move[] = squares.map((square) => ({
    start: index,
    target: chessboard.getIndex(square.coord),
    capture: !!square.piece,
  }));

  return moves;
};
const getMovesForPawn = (
  chessboard: IChessGame,
  { coord, piece }: PiecePlacement
) => {
  const index = chessboard.getIndex(coord);
  const coordinates = chessboard.getCoordinates();

  const direction = piece.color === Color.White ? -1 : +1;

  const startRank = piece.color === Color.White ? 6 : 1;
  const offset = 8;
  const offsetx2 = 16;

  const currentRank = (index - (index % 8)) / 8;

  const moves: Move[] = [];
  if (
    !chessboard.getSquare(coordinates[index + direction * offset]).piece &&
    withinBoard(index + direction * offset)
  ) {
    moves.push({
      start: index,
      target: index + direction * offset,
      capture: false,
    });
  }

  if (
    currentRank === startRank &&
    !chessboard.getSquare(coordinates[index + direction * offsetx2]).piece &&
    !chessboard.getSquare(coordinates[index + direction * offset]).piece &&
    withinBoard(index + direction * offsetx2)
  ) {
    moves.push({
      start: index,
      target: index + direction * offsetx2,
      capture: false,
    });
  }

  return moves;
};

const getMovesFromSquare = (
  chessboard: IChessGame,
  piecePlacement: PiecePlacement
): Move[] => {
  switch (piecePlacement.piece.type) {
    case PieceType.Queen:
      return getMovesForQueen(chessboard, piecePlacement);
    case PieceType.Rook:
      return getMovesForRook(chessboard, piecePlacement);
    case PieceType.Pawn:
      return getMovesForPawn(chessboard, piecePlacement);
    case PieceType.Knight:
      return getMovesForKnight(chessboard, piecePlacement);
    case PieceType.King:
      return getMovesForKing(chessboard, piecePlacement);
    case PieceType.Bishop:
      return getMovesForBishop(chessboard, piecePlacement);
    default:
      throw new Error(`Invalid piece type: ${piecePlacement.piece.type}`);
  }
};

const getMoves = (chessboard: IChessGame): Move[] => {
  return chessboard.getPiecePlacements().flatMap((piecePlacement) => {
    return getMovesFromSquare(chessboard, piecePlacement);
  });
};

const makeMove = (chessboard: IChessGame, move: Move): IChessGame => {
  const chessGameState = chessboard.getState();
  const coordinates = chessboard.getCoordinates();

  const fromCoord = coordinates[move.start];
  const toCoord = coordinates[move.target];

  const pieceToMove = chessGameState.pieces[fromCoord];
  const newPiecePlacements: PiecePlacements = {
    ...chessGameState.pieces,
    [toCoord]: pieceToMove,
  };
  delete newPiecePlacements[fromCoord];

  return ChessGame({
    ...chessGameState,
    pieces: newPiecePlacements,
  });
};

interface IRules {
  getMoves(): Move[];
  makeMove(move: Move): IChessGame;
}

export const Rules = (chessboard: IChessGame): IRules => {
  return {
    getMoves: () => getMoves(chessboard),
    makeMove: (move) => makeMove(chessboard, move),
  };
};
