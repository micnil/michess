import { gameStateFromFen } from '@michess/core-fen';
import { ChessGame, IChessGame, Move } from '@michess/core-rules';
import { MovePayload } from '@michess/core-state';
import { Chessboard as ChessboardView } from '@michess/react-chessboard';
import { useState } from 'react';

const uiMoveToCoreMove = (
  chess: IChessGame,
  movePayload: MovePayload
): Move => {
  return {
    start: chess.getIndex(movePayload.from),
    target: chess.getIndex(movePayload.to),
    capture: false,
  };
};

export const ChessGameContainer = () => {
  const [chessGame, setChessGame] = useState(() =>
    ChessGame(
      gameStateFromFen(
        'rnbqkbnr/ppp5/r1N1Q1R1/8/8/8/PPP5/RNBQKBNR w KQkq - 0 1'
      )
    ).setOrientation('white')
  );

  return (
    <ChessboardView
      orientation={chessGame.getState().orientation}
      size={500}
      piecePlacements={chessGame.getState().pieces}
      onMove={(move) => {
        setChessGame(chessGame.makeMove(uiMoveToCoreMove(chessGame, move)));
      }}
      moveOptions={chessGame.getMoves().map((move) => ({
        from: chessGame.getCoordinates()[move.start],
        to: chessGame.getCoordinates()[move.target],
      }))}
    />
  );
};
