import { gameStateFromFen } from '@michess/core-fen';
import { ChessGame, Move } from '@michess/core-rules';
import { Chessboard as ChessboardView } from '@michess/react-chessboard';
import { useState } from 'react';

export const ChessGameContainer = () => {
  const [chessGame, setChessGame] = useState(() =>
    ChessGame(
      gameStateFromFen(
        'rnbqkbnr/ppp5/r1N1Q1R1/8/8/8/PPP5/RNBQKBNR w KQkq - 0 1'
      )
    )
  );

  return (
    <ChessboardView<Move>
      orientation={chessGame.getState().orientation}
      size={500}
      piecePlacements={chessGame.getState().pieces}
      onMove={(movePayload) => {
        console.log(movePayload);
        setChessGame(chessGame.makeMove(movePayload.meta));
      }}
      moveOptions={chessGame.getMoves().map((move) => ({
        from: chessGame.getCoordinates()[move.start],
        to: chessGame.getCoordinates()[move.target],
        meta: move,
      }))}
    />
  );
};
