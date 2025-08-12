import { FenParser } from '@michess/core-fen';
import { Color } from '@michess/core-models';
import { ChessGame, Move } from '@michess/core-rules';
import {
  Chessboard as ChessboardView,
  GameStatusType,
} from '@michess/react-chessboard';
import { useState } from 'react';

const getGameStatus = (chessPosition: {
  isGameOver: boolean;
  winner?: Color | 'draw';
}): GameStatusType => {
  if (!chessPosition.isGameOver) {
    return 'active';
  } else if (chessPosition.winner === 'draw') {
    return 'draw';
  } else if (chessPosition.winner === 'white' || chessPosition.winner === 'black') {
    return 'checkmate';
  } else {
    return 'active';
  }
};

export const ChessGameContainer = () => {
  const [chessGame, setChessGame] = useState(() =>
    ChessGame(
      FenParser.toChessPosition(
        'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
      )
    )
  );

  const chessPosition = chessGame.getState();
  const moves = chessGame.getMoves();
  const gameStatus = getGameStatus(chessPosition);

  return (
    <ChessboardView<Move>
      orientation={chessPosition.orientation}
      size={500}
      piecePlacements={chessPosition.pieces}
      gameStatus={gameStatus}
      winner={chessPosition.winner !== 'draw' ? chessPosition.winner : undefined}
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
