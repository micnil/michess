import { Box, Grid } from '@radix-ui/themes';
import { useNavigate } from '@tanstack/react-router';
import React from 'react';
import { GameRecordsContainer } from '../features/game-records/GameRecordsContainer';
import { GameLobby } from '../features/lobby/GameLobby';
import { StatsContainer } from '../features/metrics/StatsContainer';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateGame = async (gameId: string) => {
    await navigate({ to: `/game/${gameId}/` });
  };

  const handleJoinGame = async (gameId: string) => {
    await navigate({ to: `/game/${gameId}/` });
  };

  return (
    <Grid
      columns={{ initial: '1', sm: '2fr 1fr' }}
      gap="4"
      width="100%"
      px={{ initial: '2', lg: '0' }}
    >
      <Box>
        <Grid gap="4">
          <Box>
            <GameLobby
              onCreateGame={handleCreateGame}
              onJoinGame={handleJoinGame}
            />
          </Box>
          <Box>
            <GameRecordsContainer onJoinGame={handleJoinGame} />
          </Box>
        </Grid>
      </Box>

      <Box gridColumn={{ initial: '1', sm: '2' }}>
        <StatsContainer />
      </Box>
    </Grid>
  );
};
