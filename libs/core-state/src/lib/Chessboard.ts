import {
  BoardCoordinates,
  BoardState,
  Color,
  Coordinate,
  PiecePlacement,
  SquareState,
} from '@michess/core-models';
import { IChessboard } from './model/IChessboard';
import { MovePayload } from './model/MovePayload';

const movePiece = (board: BoardState, move: MovePayload): BoardState => {
  const toIndex = coordToIndex(board, move.to);
  const fromIndex = coordToIndex(board, move.from);

  console.debug({ move, fromIndex, toIndex });
  const fromSquare = getSquare(board, move.from);
  const toSquare = getSquare(board, move.to);

  if (!fromSquare.piece) {
    console.warn('attempted to move an empty square');
    return board;
  }

  const movedPiece = fromSquare.piece;
  const squaresCopy = { ...board.squares };
  delete squaresCopy[fromSquare.coord];
  const squaresWithMovedPiece = {
    ...squaresCopy,
    [toSquare.coord]: movedPiece,
  };

  return {
    ...board,
    squares: squaresWithMovedPiece,
  };
};

const setOrientation = (board: BoardState, orientation: Color): BoardState => {
  return {
    ...board,
    orientation,
  };
};

const coordToIndex = (board: BoardState, coord: Coordinate): number => {
  const file = coord.charCodeAt(0) - 97;
  const rank = coord.charCodeAt(1) - 49;
  const whiteIndex = file + (7 - rank) * 8;
  const index =
    board.orientation === Color.White ? whiteIndex : 63 - whiteIndex;
  return index;
};

const getPiecePlacements = (board: BoardState): PiecePlacement[] => {
  return Object.entries(board.squares).map(([coord, piece]) => ({
    coord: coord as Coordinate,
    piece,
  }));
};

const getSquare = (board: BoardState, coord: Coordinate): SquareState => {
  return {
    coord,
    piece: board.squares[coord],
  };
};

export const Chessboard = (board: BoardState): IChessboard => {
  return {
    getIndex: (coord) => coordToIndex(board, coord),
    getSquare: (coord) => getSquare(board, coord),
    getCoordinates: () => BoardCoordinates.getCoordinates(board.orientation),
    getPiecePlacements: () => getPiecePlacements(board),
    movePiece: (movePayload: MovePayload) =>
      Chessboard(movePiece(board, movePayload)),
    setOrientation: (orientation: Color) =>
      Chessboard(setOrientation(board, orientation)),
    getState: () => board,
  };
};
