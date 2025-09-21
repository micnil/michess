import { Color, Move } from '@michess/core-board';
import { GameState } from '@michess/core-game';
import {
  Chessboard as ChessboardView,
  GameStatusType,
} from '@michess/react-chessboard';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useApi } from '../../api/hooks/useApi';

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

export const ChessGameContainer = ({
  gameId,
  orientation,
  playerSide,
}: {
  gameId?: string;
  orientation?: Color;
  playerSide?: Color;
}) => {
  const { games } = useApi();

  const { data } = useQuery({
    queryKey: ['game', gameId],
    queryFn: async () => {
      if (!gameId) return null;
      const gameDetails = await games.joinGame(gameId);
      return gameDetails;
    },
    enabled: !!gameId,
  });
  const moveObservable = useMemo(() => {
    if (!gameId) return undefined;
    return games.observeMovesForGame(gameId);
  }, [gameId, games]);

  return (
    <ChessboardView<Move>
      orientation={orientation}
      maxSize={600}
      gameStatus={undefined}
      winner={undefined}
      playableTurn={
        data?.playerSide === 'spectator' ? undefined : data?.playerSide
      }
      readonly={data?.playerSide === 'spectator'}
      moveHistory={data?.moves}
      moveObservable={moveObservable || undefined}
      onMove={async (move) => {
        console.log(move);
        if (!gameId) return true;
        try {
          await games.makeMove(gameId, Move.toUci(move));
          return true;
        } catch (error) {
          console.error('Error making move:', error);
          return false;
        }
      }}
    />
  );
};
