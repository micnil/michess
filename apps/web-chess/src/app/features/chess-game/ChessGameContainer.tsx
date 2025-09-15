import { FenParser, Move } from '@michess/core-board';
import { Chessboard, GameState } from '@michess/core-game';
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

export const ChessGameContainer = ({ gameId }: { gameId?: string }) => {
  const [chessboard, setChessboard] = useState(() =>
    Chessboard.fromPosition(
      FenParser.toChessPosition(
        'rnbq1b1r/pppPpk1p/5np1/5p2/8/8/PPPP1PPP/RNBQKBNR w KQ - 1 5'
      )
    )
  );

  // TODO: Load game state from API using gameId
  // For now, we'll use the default position
  console.log('Loading game with ID:', gameId);

  return (
    <ChessboardView<Move>
      orientation={'white'}
      size={500}
      gameStatus={undefined}
      winner={undefined}
      moveHistory={chessboard.movesRecord}
      onMove={async (move) => {
        console.log(move);
        setChessboard(chessboard.playMove(move));
        return true;
      }}
    />
  );
};
