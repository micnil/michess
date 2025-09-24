import { Color, Move } from '@michess/core-board';
import { Chessboard as ChessboardView } from '@michess/react-chessboard';
import { Box, Card, Grid, Inset } from '@radix-ui/themes';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useApi } from '../../api/hooks/useApi';
import { ParticipantGameViewModel } from '../../api/model/ParticipantGameViewModel';
import { useObservable } from '../../util/useObservable';
import { PlayerInfo } from './components';

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
    gcTime: Infinity,
    staleTime: Infinity,
    refetchOnMount: 'always',
  });
  const { data: gameObservable } = useQuery({
    queryKey: ['game', gameId, 'observable'],
    queryFn: async () => games.observeGameState(gameId),
    gcTime: Infinity,
    staleTime: Infinity,
    refetchOnMount: 'always',
  });

  useObservable(
    gameObservable,
    (gameState) => {
      queryClient.setQueryData<ParticipantGameViewModel>(
        ['game', gameId],
        () => {
          return gameState;
        }
      );
    },
    () => {
      games.leaveGame(gameId);
    }
  );
  const moveObservable = useMemo(() => {
    if (!gameId) return undefined;
    return games.observeMovesForGame(gameId);
  }, [gameId, games]);

  const whitePlayerInfo = (
    <PlayerInfo
      username={data?.whitePlayer?.username}
      avatar={data?.whitePlayer?.avatar}
      color={Color.White}
      isPlayerTurn={data ? data.moves.length % 2 === 0 : false}
    />
  );

  const blackPlayerInfo = (
    <PlayerInfo
      username={data?.blackPlayer?.username}
      avatar={data?.blackPlayer?.avatar}
      color={Color.Black}
      isPlayerTurn={data ? data.moves.length % 2 === 1 : false}
    />
  );

  const currentOrientation = orientation || Color.White;
  const topPlayerInfo =
    currentOrientation === Color.White ? blackPlayerInfo : whitePlayerInfo;
  const bottomPlayerInfo =
    currentOrientation === Color.White ? whitePlayerInfo : blackPlayerInfo;

  return (
    <Grid columns={'1fr auto 1fr'} style={{ justifyItems: 'center' }} gap="4">
      <Box display={'inline-block'} gridColumn={'2'}>
        <Card size={'1'}>
          <Inset>
            {topPlayerInfo}
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
            {bottomPlayerInfo}
          </Inset>
        </Card>
      </Box>
    </Grid>
  );
};
