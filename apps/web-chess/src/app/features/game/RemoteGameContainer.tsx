import { Color } from '@michess/core-board';
import { Chessboard as ChessboardView } from '@michess/react-chessboard';
import { Box, Card, Grid, Inset, Skeleton } from '@radix-ui/themes';
import { useAuth } from '../../api/hooks/useAuth';
import { Alert } from '../../components/Alert';
import { PlayerInfo } from './components/PlayerInfo';
import { useRemoteGame } from './hooks/useRemoteGame';

export const RemoteGameContainer = ({
  gameId,
  orientation,
}: {
  gameId: string;
  orientation?: Color;
}) => {
  const { chessboard, handleMove, gameState, isLoadingInitial, error } =
    useRemoteGame({
      gameId,
    });
  const { auth } = useAuth();
  const { players, playerSide, result, isReadOnly } = gameState;
  orientation = playerSide !== 'spectator' ? playerSide : orientation;

  const blackPlayer = { ...players.black, color: Color.Black };
  const whitePlayer = { ...players.white, color: Color.White };
  const currentOrientation = orientation || Color.White;
  const topPlayer =
    currentOrientation === Color.White ? blackPlayer : whitePlayer;
  const bottomPlayer =
    currentOrientation === Color.White ? whitePlayer : blackPlayer;

  return (
    <Grid
      columns={{ initial: '1', sm: '1fr auto 1fr' }}
      style={{ justifyItems: 'center' }}
      gap={{ initial: '1', sm: '4' }}
    >
      <Box gridColumn={{ initial: '1', sm: '2' }}>
        <Alert text={error?.message} />
        <Card size={'1'}>
          <Inset>
            <PlayerInfo
              isPlayerAnonymous={auth?.user?.isAnonymous || false}
              playerSide={playerSide}
              username={topPlayer?.username}
              avatar={topPlayer?.avatar}
              color={topPlayer.color}
              isPlayerTurn={chessboard.position.turn === topPlayer.color}
              isLoading={isLoadingInitial}
            />
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
                readonly={isReadOnly}
                onMove={handleMove}
              />
            </Skeleton>
            <PlayerInfo
              isPlayerAnonymous={auth?.user?.isAnonymous || false}
              playerSide={playerSide}
              username={bottomPlayer?.username}
              avatar={bottomPlayer?.avatar}
              color={bottomPlayer.color}
              isPlayerTurn={chessboard.position.turn === bottomPlayer.color}
              isLoading={isLoadingInitial}
            />
          </Inset>
        </Card>
      </Box>
    </Grid>
  );
};
