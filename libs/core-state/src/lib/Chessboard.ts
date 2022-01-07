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
  console.debug({ move });
  const fromSquare = getSquare(board, move.from);
  const toSquare = getSquare(board, move.to);

  if (!fromSquare.piece) {
    console.warn('attempted to move an empty square');
    return board;
  }

  const movedPiece = fromSquare.piece;
  const squaresCopy = { ...board.pieces };
  delete squaresCopy[fromSquare.coord];
  const squaresWithMovedPiece = {
    ...squaresCopy,
    [toSquare.coord]: movedPiece,
  };

  return {
    ...board,
    pieces: squaresWithMovedPiece,
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
  const index = board.orientation === 'white' ? whiteIndex : 63 - whiteIndex;
  return index;
};

const getPiecePlacements = (board: BoardState): PiecePlacement[] => {
  return Object.entries(board.pieces).map(([coord, piece]) => ({
    coord: coord as Coordinate,
    piece,
  }));
};

const getSquare = (board: BoardState, coord: Coordinate): SquareState => {
  return {
    coord,
    piece: board.pieces[coord],
  };
};

export const Chessboard = (board: BoardState): IChessboard => {
  return {
    getIndex: (coord) => coordToIndex(board, coord),
    getSquare: (coord) => getSquare(board, coord),
    getCoordinates: () => BoardCoordinates.fromOrientation(board.orientation),
    getPiecePlacements: () => getPiecePlacements(board),
    movePiece: (movePayload: MovePayload) =>
      Chessboard(movePiece(board, movePayload)),
    setOrientation: (orientation: Color) =>
      Chessboard(setOrientation(board, orientation)),
    getState: () => board,
  };
};
