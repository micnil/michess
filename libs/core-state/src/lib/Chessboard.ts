import {
  BoardCoordinates,
  BoardState,
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
    getIndex: (coord) => Coordinate.toIndex(coord),
    getSquare: (coord) => getSquare(board, coord),
    getCoordinates: () => BoardCoordinates.createWhite(),
    getPiecePlacements: () => getPiecePlacements(board),
    movePiece: (movePayload: MovePayload) =>
      Chessboard(movePiece(board, movePayload)),
    getState: () => board,
  };
};
