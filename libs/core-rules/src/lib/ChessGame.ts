import { Color, GameState, PiecePlacements } from '@michess/core-models';
import { Chessboard } from '@michess/core-state';
import { IChessGame } from './model/IChessGame';
import { Move } from './model/Move';
import { Rules } from './Rules';

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

  return {
    ...gameState,
    pieces: newPiecePlacements,
  };
};

export const ChessGame = (gameState: GameState): IChessGame => {
  const chessboard = Chessboard(gameState);
  const rules = Rules(gameState);

  return {
    ...chessboard,
    getState: () => gameState,
    setOrientation: (orientation: Color) =>
      ChessGame({
        ...gameState,
        ...chessboard.setOrientation(orientation).getState(),
      }),
    getMoves: () => rules.getMoves(),
    makeMove: (move) => ChessGame(makeMove(gameState, move)),
  };
};
