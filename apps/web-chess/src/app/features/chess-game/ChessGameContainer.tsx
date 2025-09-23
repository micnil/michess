import { Color, Move } from '@michess/core-board';
import { GameState } from '@michess/core-game';
import {
  Chessboard as ChessboardView,
  GameStatusType,
} from '@michess/react-chessboard';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useApi } from '../../api/hooks/useApi';
import { ParticipantGameViewModel } from '../../api/model/ParticipantGameViewModel';
import { useObservable } from '../../util/useObservable';
import { useUnmount } from '../../util/useUnmount';

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
}: {
  gameId: string;
  orientation?: Color;
}) => {
  const { games } = useApi();

  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ['game', gameId],
    queryFn: async () => games.joinGame(gameId),
  });
  const moveObservable = useMemo(() => {
    if (!gameId) return undefined;
    return games.observeMovesForGame(gameId);
  }, [gameId, games]);

  useObservable(
    () => games.observeGameState(gameId),
    (gameState) => {
      queryClient.setQueryData<ParticipantGameViewModel>(
        ['game', gameId],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            ...gameState,
          };
        }
      );
    }
  );

  useUnmount(() => {
    if (gameId) {
      games.leaveGame(gameId);
    }
  });

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
      whitePlayer={data?.whitePlayer}
      blackPlayer={data?.blackPlayer}
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
