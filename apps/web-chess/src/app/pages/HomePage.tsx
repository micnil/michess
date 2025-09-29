import { Box, Flex } from '@radix-ui/themes';
import { useNavigate } from '@tanstack/react-router';
import React from 'react';
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
