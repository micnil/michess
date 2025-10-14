import { Color } from '@michess/core-board';
import { Chessboard as ChessboardView } from '@michess/react-chessboard';
import { Box, Card, Flex, Grid, Inset, Skeleton } from '@radix-ui/themes';
import { useAuth } from '../../api/hooks/useAuth';
import { Alert } from '../../components/Alert';
import { GameToolbar } from './components/GameToolbar';
import { MovesRecord } from './components/MovesRecord';
import { PlayerInfo } from './components/PlayerInfo';
import { usePeekBoardState } from './hooks/usePeekBoardState';
import { useRemoteGame } from './hooks/useRemoteGame';
import styles from './RemoteGameContainer.module.css';

export const RemoteGameContainer = ({
  gameId,
  orientation,
}: {
  gameId: string;
  orientation?: Color;
}) => {
  const {
    chessboard,
    handleMove,
    gameState,
    isLoadingInitial,
    error,
    actionState,
  } = useRemoteGame({
    gameId,
  });
  const {
    actions: peekActions,
    board: peekBoard,
    isPeeking,
  } = usePeekBoardState(chessboard);
  const { auth } = useAuth();
  const { players, playerSide, result, isReadOnly, actionOptions } = gameState;
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
      rows={'auto 1fr'}
      height={'100%'}
      gapX={{ initial: '0', sm: '4' }}
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
                gameResult={isPeeking ? undefined : result?.type}
                chessboard={isPeeking ? peekBoard : chessboard}
                playableTurn={
                  playerSide === 'spectator' ? undefined : playerSide
                }
                readonly={isReadOnly || isPeeking}
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
      <Flex
        gridColumn={'3'}
        style={{
          justifySelf: 'start',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <Flex
          className={styles.gradientBox}
          direction={'column'}
          justify={'between'}
          display={{ initial: 'none', md: 'flex' }}
          p="4"
          style={{
            height: '300px',
            width: '100%',
          }}
        >
          <MovesRecord
            moves={chessboard.moveNotations}
            orientation={'vertical'}
            peekActions={peekActions}
          />
          <GameToolbar
            peekActions={peekActions}
            actionOptions={actionOptions}
            onMakeAction={actionState.makeAction}
            isPending={actionState.isPending}
            error={actionState.error}
          />
        </Flex>
      </Flex>
      <Flex
        style={{ width: '100%' }}
        height={'100%'}
        direction={'column'}
        justify={'between'}
        gridColumn={{ initial: '1', sm: '2' }}
        display={{ initial: 'flex', md: 'none' }}
      >
        <MovesRecord
          peekActions={peekActions}
          moves={chessboard.moveNotations}
          orientation={'horizontal'}
        />
        <GameToolbar
          peekActions={peekActions}
          actionOptions={actionOptions}
          onMakeAction={actionState.makeAction}
          isPending={actionState.isPending}
          error={actionState.error}
        />
      </Flex>
    </Grid>
  );
};
