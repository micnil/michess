import { Color } from '@michess/core-board';
import { Chessboard as ChessboardView } from '@michess/react-chessboard';
import { Box, Card, Grid, Inset, Skeleton } from '@radix-ui/themes';
import { useMemo } from 'react';
import { PlayerInfo } from './components/PlayerInfo';
import { useRemoteGame } from './hooks/useRemoteGame';

export const RemoteGameContainer = ({
  gameId,
  orientation,
}: {
  gameId: string;
  orientation?: Color;
}) => {
  const { chessboard, handleMove, gameState, isLoadingInitial } = useRemoteGame(
    {
      gameId,
    }
  );
  const { players, playerSide, result, startedAt } = gameState;
  orientation = playerSide !== 'spectator' ? playerSide : orientation;

  const whitePlayerInfo = useMemo(
    () => (
      <PlayerInfo
        username={players.white?.username}
        avatar={players.white?.avatar}
        color={Color.White}
        isPlayerTurn={chessboard.position.turn === Color.White}
        isLoading={isLoadingInitial}
      />
    ),
    [
      isLoadingInitial,
      players.white?.username,
      players.white?.avatar,
      chessboard.position.turn,
    ]
  );

  const blackPlayerInfo = useMemo(
    () => (
      <PlayerInfo
        username={players.black?.username}
        avatar={players.black?.avatar}
        color={Color.Black}
        isPlayerTurn={chessboard.position.turn === Color.Black}
        isLoading={isLoadingInitial}
      />
    ),
    [
      players.black?.username,
      players.black?.avatar,
      chessboard.position.turn,
      isLoadingInitial,
    ]
  );

  const currentOrientation = orientation || Color.White;

  const topPlayerInfo = useMemo(
    () =>
      currentOrientation === Color.White ? blackPlayerInfo : whitePlayerInfo,
    [currentOrientation, blackPlayerInfo, whitePlayerInfo]
  );

  const bottomPlayerInfo = useMemo(
    () =>
      currentOrientation === Color.White ? whitePlayerInfo : blackPlayerInfo,
    [currentOrientation, whitePlayerInfo, blackPlayerInfo]
  );

  return (
    <Grid
      columns={{ initial: '1', sm: '1fr auto 1fr' }}
      style={{ justifyItems: 'center' }}
      gap={{ initial: '1', sm: '4' }}
    >
      <Box gridColumn={{ initial: '1', sm: '2' }}>
        <Card size={'1'}>
          <Inset>
            {topPlayerInfo}
            <Skeleton loading={isLoadingInitial} height={'9'} width={'5'}>
              <ChessboardView
                isLoading={isLoadingInitial}
                orientation={
                  playerSide !== 'spectator' ? playerSide : orientation
                }
                maxSize={600}
                gameResult={result?.type}
                chessboard={chessboard}
                playableTurn={
                  playerSide === 'spectator' ? undefined : playerSide
                }
                readonly={playerSide === 'spectator' || !startedAt || !!result}
                onMove={handleMove}
              />
            </Skeleton>
            {bottomPlayerInfo}
          </Inset>
        </Card>
      </Box>
    </Grid>
  );
};
