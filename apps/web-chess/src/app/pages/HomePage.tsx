import { Box, Flex, Grid } from '@radix-ui/themes';
import { useNavigate } from '@tanstack/react-router';
import React from 'react';
import { GameLobby } from '../features/lobby/GameLobby';
import { StatsContainer } from '../features/metrics/StatsContainer';
import { Footer } from '../features/navigation/Footer';
import { PlayerGamesOverview } from '../features/player-games-overview/PlayerGamesOverview';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateGame = async (gameId: string) => {
    await navigate({ to: `/game/${gameId}/` });
  };

  const handleJoinGame = async (gameId: string) => {
    await navigate({ to: `/game/${gameId}/` });
  };

  return (
    <Flex
      direction="column"
      style={{
        minHeight: 'calc(100vh - 96px)', // Account for header space
      }}
    >
      <Box style={{ flex: 1 }}>
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
                <PlayerGamesOverview onJoinGame={handleJoinGame} />
              </Box>
            </Grid>
          </Box>

          <Box gridColumn={{ initial: '1', sm: '2' }}>
            <StatsContainer />
          </Box>
        </Grid>
      </Box>

      <Footer />
    </Flex>
  );
};
