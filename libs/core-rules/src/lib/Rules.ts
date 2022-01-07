import { takeWhile } from '@michess/common-utils';
import {
  Color,
  GameState,
  PiecePlacement,
  PieceType,
} from '@michess/core-models';
import { Move } from './model/Move';
import { Chessboard, IChessboard } from '@michess/core-state';

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
  chessboard: IChessboard,
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
// const getMovesForPawn = (
//   chessboard: IChessboard,
//   { coord, piece }: PiecePlacement
// ) => {
//   const index = chessboard.getIndex(coord);
//   const coordinates = chessboard.getCoordinates();

//   const direction = piece.color === Color.White ? -1 : +1;

//   const startRank = piece.color === Color.White ? 6 : 1;
//   const offset = 8;
//   const offsetx2 = 16;

//   const currentRank = (index - (index % 8)) / 8;

//   const moves: Move[] = [];
//   if (
//     !chessboard.getSquare(coordinates[index + direction * offset]).piece &&
//     withinBoard(index + direction * offset)
//   ) {
//     moves.push({
//       start: index,
//       target: index + direction * offset,
//       capture: false,
//     });
//   }

//   if (
//     currentRank === startRank &&
//     !chessboard.getSquare(coordinates[index + direction * offsetx2]).piece &&
//     !chessboard.getSquare(coordinates[index + direction * offset]).piece &&
//     withinBoard(index + direction * offsetx2)
//   ) {
//     moves.push({
//       start: index,
//       target: index + direction * offsetx2,
//       capture: false,
//     });
//   }

//   return moves;
// };
const getMovesForPawn = (
  chessboard: IChessboard,
  { coord, piece }: PiecePlacement
) => {
  const index = chessboard.getIndex(coord);
  const coordinates = chessboard.getCoordinates();

  const direction = piece.color === Color.White ? -1 : +1;
  const startRank = piece.color === Color.White ? 6 : 1;

  const oneStepIndex = index + direction * 8;
  const oneStepSquare = withinBoard(oneStepIndex)
    ? chessboard.getSquare(coordinates[oneStepIndex])
    : undefined;

  const twoStepIndex = index + direction * 16;
  const twoStepSquare = withinBoard(twoStepIndex)
    ? chessboard.getSquare(coordinates[twoStepIndex])
    : undefined;

  const captureIndex1 = index + direction * 7;
  const captureSquare1 =
    withinBoard(captureIndex1) && isNeighbors(index, captureIndex1)
      ? chessboard.getSquare(coordinates[captureIndex1])
      : undefined;

  const captureIndex2 = index + direction * 9;
  const captureSquare2 =
    withinBoard(captureIndex2) && isNeighbors(index, captureIndex2)
      ? chessboard.getSquare(coordinates[captureIndex2])
      : undefined;

  const currentRank = (index - (index % 8)) / 8;
  const isStartPosition = currentRank === startRank;

  const moves: Move[] = [];
  if (!oneStepSquare?.piece) {
    moves.push({
      start: index,
      target: oneStepIndex,
      capture: false,
    });
  }

  if (isStartPosition && !oneStepSquare?.piece && !twoStepSquare?.piece) {
    moves.push({
      start: index,
      target: twoStepIndex,
      capture: false,
    });
  }

  if (captureSquare1?.piece && captureSquare1.piece.color !== piece.color) {
    moves.push({
      start: index,
      target: captureIndex1,
      capture: true,
    });
  }

  if (captureSquare2?.piece && captureSquare2.piece.color !== piece.color) {
    moves.push({
      start: index,
      target: captureIndex2,
      capture: true,
    });
  }

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

const getMoves = (chessboard: IChessboard, turn: Color): Move[] => {
  return chessboard
    .getPiecePlacements()
    .filter((piecePlacement) => piecePlacement.piece.color === turn)
    .flatMap((piecePlacement) => {
      return getMovesFromSquare(chessboard, piecePlacement);
    });
};

interface IRules {
  getMoves(): Move[];
}

export const Rules = (gameState: GameState): IRules => {
  const chessboard = Chessboard(gameState);
  return {
    getMoves: () => getMoves(chessboard, gameState.turn),
  };
};
