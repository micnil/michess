import { FenParser } from '@michess/core-fen';
import { Color } from '@michess/core-models';
import { ChessGame, Move } from '@michess/core-rules';
import {
  Chessboard as ChessboardView,
  GameStatusType,
} from '@michess/react-chessboard';
import { useState } from 'react';

const getGameStatus = (
  gameState: { isGameOver: boolean; winner?: Color | 'draw' },
  moves: Move[]
): GameStatusType => {
  if (!gameState.isGameOver) {
    return 'active';
  }

  if (gameState.winner === 'draw') {
    // Check if it's stalemate (no legal moves but not in check)
    if (moves.length === 0) {
      return 'stalemate';
    }
    return 'draw';
  }

  if (gameState.winner === 'white' || gameState.winner === 'black') {
    return 'checkmate';
  }

  return 'active';
};

export const ChessGameContainer = () => {
  const [chessGame, setChessGame] = useState(() =>
    ChessGame(
      FenParser.toGameState(
        'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
      )
    )
  );

  const gameState = chessGame.getState();
  const moves = chessGame.getMoves();
  const gameStatus = getGameStatus(gameState, moves);

  return (
    <ChessboardView<Move>
      orientation={gameState.orientation}
      size={500}
      piecePlacements={gameState.pieces}
      gameStatus={gameStatus}
      winner={gameState.winner !== 'draw' ? gameState.winner : undefined}
      onMove={(movePayload) => {
        console.log(movePayload);
        setChessGame(chessGame.makeMove(movePayload.meta));
      }}
      moveOptions={moves.map((move) => ({
        from: chessGame.getCoordinates()[move.start],
        to: chessGame.getCoordinates()[move.target],
        meta: move,
      }))}
    />
  );
};
