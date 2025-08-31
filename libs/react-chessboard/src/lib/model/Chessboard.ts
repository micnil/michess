import {
  BoardCoordinates,
  BoardState,
  Coordinate,
  PiecePlacement,
  SquareState,
} from '@michess/core-board';
import { MovePayload } from './MovePayload';
import { IChessboard } from './IChessboard';

const movePiece = (board: BoardState, move: MovePayload): BoardState => {
  console.debug({ move });
  const fromSquare = getSquare(board, move.from);
  const toSquare = getSquare(board, move.to);

  if (!fromSquare.piece) {
    console.warn('attempted to move an empty square');
    return board;
  }

  const movedPiece = fromSquare.piece;
  const squaresCopy = new Map(board.pieces);
  squaresCopy.delete(fromSquare.coord);
  squaresCopy.set(toSquare.coord, movedPiece);

  return {
    ...board,
    pieces: squaresCopy,
  };
};

const getPiecePlacements = (board: BoardState): PiecePlacement[] => {
  return Array.from(board.pieces.entries()).map(([coord, piece]) => ({
    coord: coord as Coordinate,
    piece,
  }));
};

const getSquare = (board: BoardState, coord: Coordinate): SquareState => {
  return {
    coord,
    piece: board.pieces.get(coord),
  };
};

export const Chessboard = (board: BoardState): IChessboard => {
  return {
    getIndex: (coord) => Coordinate.toIndex(coord),
    getCoordinates: () => BoardCoordinates.createWhite(),
    getPiecePlacements: () => getPiecePlacements(board),
    movePiece: (movePayload: MovePayload) =>
      Chessboard(movePiece(board, movePayload)),
    getState: () => board,
  };
};
