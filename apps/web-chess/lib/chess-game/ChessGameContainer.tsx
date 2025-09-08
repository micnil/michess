import { FenParser, Move } from '@michess/core-board';
import { ChessGame, GameState, MoveOption } from '@michess/core-game';
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
  const position = chessGame.getPosition();
  const moves = chessGame.getMoves();
  const gameStatus = getGameStatus(gameState);

  return (
    <ChessboardView<Move>
      orientation={'white'}
      size={500}
      piecePlacements={position.pieces}
      gameStatus={gameStatus}
      winner={
        gameState.result?.type === 'black_win'
          ? 'black'
          : gameState.result?.type === 'white_win'
          ? 'white'
          : undefined
      }
      moveHistory={gameState.moveHistory}
      onMove={(movePayload) => {
        console.log(movePayload);
        setChessGame(chessGame.play(movePayload));
      }}
      moveOptions={moves.map((move) => MoveOption.toMove(move))}
    />
  );
};
