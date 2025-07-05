import {
  Color,
  Coordinate,
  GameState,
  Piece,
  PiecePlacements,
} from '@michess/core-models';
import { Chessboard } from '@michess/core-state';
import { IChessGame } from './model/IChessGame';
import { Move } from './model/Move';
import { MoveGenerator } from './MoveGenerator';

const oneStepBackFromIndex = (index: number, color: Color): Coordinate => {
  return Coordinate.fromIndex(color === Color.White ? index + 8 : index - 8);
};
const oneStepBackFromCoordinate = (
  coord: Coordinate,
  color: Color
): Coordinate => {
  const index = Coordinate.toIndex(coord);
  return oneStepBackFromIndex(index, color);
};

const makeMove = (gameState: GameState, move: Move): GameState => {
  const chessboard = Chessboard(gameState);
  const boardState = chessboard.getState();
  const coordinates = chessboard.getCoordinates();

  if (move.start == move.target) {
    return gameState;
  }

  const fromCoord = coordinates[move.start];
  const toCoord = coordinates[move.target];

  const pieceToMove = boardState.pieces[fromCoord];
  const newPiecePlacements: PiecePlacements = {
    ...boardState.pieces,
    [toCoord]: pieceToMove,
  };
  delete newPiecePlacements[fromCoord];

  if (Coordinate.fromIndex(move.target) === gameState.enPassant) {
    delete newPiecePlacements[
      oneStepBackFromCoordinate(gameState.enPassant, gameState.turn)
    ];
  }

  if (move.promotion && pieceToMove) {
    newPiecePlacements[toCoord] = Piece.from(move.promotion, pieceToMove.color);
  }

  return {
    ...gameState,
    turn: gameState.turn === Color.White ? Color.Black : Color.White,
    pieces: newPiecePlacements,
    // Update enPassant if the move is a double pawn advance
    // TODO: only set if a enPassant move is posssible.
    enPassant:
      pieceToMove?.type === 'p' && Math.abs(move.start - move.target) === 16
        ? oneStepBackFromIndex(move.target, gameState.turn)
        : undefined,
  };
};

export const ChessGame = (gameState: GameState): IChessGame => {
  const chessboard = Chessboard(gameState);
  const moveGenerator = MoveGenerator(gameState);

  return {
    ...chessboard,
    getState: () => gameState,
    getMoves: () => moveGenerator.generateMoves().moves,
    makeMove: (move) => ChessGame(makeMove(gameState, move)),
  };
};
