import { Color, Move } from '@michess/core-board';
import { Chessboard as ChessboardView } from '@michess/react-chessboard';
import { Box, Card, Grid, Inset } from '@radix-ui/themes';
import { useMemo } from 'react';
import { PlayerInfo } from './components/PlayerInfo';
import { useRemoteChessGame } from './hooks/useRemoteChessGame';

export const ChessGameContainer = ({
  gameId,
  orientation,
}: {
  gameId: string;
  orientation?: Color;
}) => {
  const { chessboard, handleMove, players, playerSide } = useRemoteChessGame({
    gameId,
  });

  const whitePlayerInfo = useMemo(
    () => (
      <PlayerInfo
        username={players.white?.username}
        avatar={players.white?.avatar}
        color={Color.White}
        isPlayerTurn={chessboard.position.turn === Color.White}
      />
    ),
    [players.white?.username, players.white?.avatar, chessboard.position.turn]
  );

  const blackPlayerInfo = useMemo(
    () => (
      <PlayerInfo
        username={players.black?.username}
        avatar={players.black?.avatar}
        color={Color.Black}
        isPlayerTurn={chessboard.position.turn === Color.Black}
      />
    ),
    [players.black?.username, players.black?.avatar, chessboard.position.turn]
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
      <Box display={'inline-block'} gridColumn={{ initial: '1', sm: '2' }}>
        <Card size={'1'}>
          <Inset>
            {topPlayerInfo}
            <ChessboardView<Move>
              orientation={orientation}
              maxSize={600}
              gameStatus={undefined}
              winner={undefined}
              chessboard={chessboard}
              playableTurn={playerSide === 'spectator' ? undefined : playerSide}
              readonly={playerSide === 'spectator'}
              onMove={handleMove}
            />
            {bottomPlayerInfo}
          </Inset>
        </Card>
      </Box>
    </Grid>
  );
};
