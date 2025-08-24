import { FenParser } from '@michess/core-fen';
import { Coordinate, GameState, Move } from '@michess/core-models';
import { ChessGame } from '@michess/core-rules';
import {
  Chessboard as ChessboardView,
  GameStatusType,
} from '@michess/react-chessboard';
import { useState } from 'react';

const getGameStatus = (gameState: GameState): GameStatusType => {
  if (!gameState.result) {
    return 'active';
  } else if (gameState.result.type === 'draw') {
    return 'draw';
  } else if (
    gameState.result.type === 'white_win' ||
    gameState.result.type === 'black_win'
  ) {
    return 'checkmate';
  } else {
    return 'active';
  }
};

export const ChessGameContainer = () => {
  const [chessGame, setChessGame] = useState(() =>
    ChessGame.fromChessPosition(
      FenParser.toChessPosition(
        'rnbq1b1r/pppPpk1p/5np1/5p2/8/8/PPPP1PPP/RNBQKBNR w KQ - 1 5'
      )
    )
  );

  const gameState = chessGame.getState();
  const moves = chessGame.getMoves();
  const gameStatus = getGameStatus(gameState);

  return (
    <ChessboardView<Move>
      orientation={gameState.orientation}
      size={500}
      piecePlacements={gameState.pieces}
      gameStatus={gameStatus}
      winner={
        gameState.result?.type === 'black_win'
          ? 'black'
          : gameState.result?.type === 'white_win'
          ? 'white'
          : undefined
      }
      moveHistory={gameState.moveHistory.map((move) => ({
        from: Coordinate.fromIndex(move.start),
        to: Coordinate.fromIndex(move.target),
        promotion: move.promotion,
        meta: move,
      }))}
      onMove={(movePayload) => {
        console.log(movePayload);
        setChessGame(chessGame.makeMove(movePayload.meta));
      }}
      moveOptions={moves.map((move) => ({
        from: Coordinate.fromIndex(move.start),
        to: Coordinate.fromIndex(move.target),
        promotion: move.promotion,
        meta: move,
      }))}
    />
  );
};
