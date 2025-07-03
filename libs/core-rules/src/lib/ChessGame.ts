import { Color, GameState, PiecePlacements } from '@michess/core-models';
import { Chessboard } from '@michess/core-state';
import { IChessGame } from './model/IChessGame';
import { Move } from './model/Move';
import { MoveGenerator } from './MoveGenerator';

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

  if (move.enPassant && gameState.enPassant) {
    delete newPiecePlacements[gameState.enPassant];
  }

  return {
    ...gameState,
    turn: gameState.turn === Color.White ? Color.Black : Color.White,
    pieces: newPiecePlacements,
    // Update enPassant if the move is a double pawn advance
    // TODO: only set if a enPassant move is posssible.
    enPassant:
      pieceToMove?.type === 'p' && Math.abs(move.start - move.target) === 16
        ? coordinates[move.target + (gameState.turn === Color.White ? -8 : 8)]
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
