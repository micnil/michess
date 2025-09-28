import { Box, Flex } from '@radix-ui/themes';
import { useNavigate } from '@tanstack/react-router';
import React from 'react';
import { useApi } from '../api/hooks/useApi';
import { GameLobby } from '../features/lobby/GameLobby';
import { StatsContainer } from '../features/metrics/StatsContainer';

export const HomePage: React.FC = () => {
  const api = useApi();
  const navigate = useNavigate();

  const handleCreateGame = async () => {
    try {
      console.log('Creating a new game...');
      const gameDetails = await api.games.createGame(false);

      console.log('Game created:', gameDetails);
      await api.games.joinGame(gameDetails.id, 'white');
      console.log('Joined game:', gameDetails.id);

      // Navigate to the game page
      await navigate({ to: `/game/${gameDetails.id}/` });
    } catch (error) {
      console.error('Failed to create game:', error);
      // TODO: Show error message to user
    }
  };

  const handleJoinGame = async (gameId: string) => {
    console.log('Joining game:', gameId);
    // Navigate to the game page
    await navigate({ to: `/game/${gameId}/` });
  };

  return (
    <Flex
      direction={'row'}
      wrap={'wrap'}
      gap={'4'}
      width={'100%'}
      px={{ initial: '2', lg: '0' }}
    >
      <Box flexGrow={'1'}>
        <GameLobby
          onCreateGame={handleCreateGame}
          onJoinGame={handleJoinGame}
        />
      </Box>

      <Box flexGrow={'1'} style={{ minWidth: '250px', flexBasis: '250px' }}>
        <StatsContainer />
      </Box>
    </Flex>
  );
};
