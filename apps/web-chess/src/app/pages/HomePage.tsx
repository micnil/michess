import { useNavigate } from '@tanstack/react-router';
import React from 'react';
import styled from 'styled-components';
import { useApi } from '../api/hooks/useApi';
import { GameLobby } from '../features/lobby/GameLobby';
import { QuickPairing } from '../features/quick-pairing/QuickPairing';
import { StatsSection } from '../features/stats/StatsSection';

const HomeContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const HomePage: React.FC = () => {
  const api = useApi();
  const navigate = useNavigate();

  const handleQuickPlay = (timeControl: {
    id: string;
    type: string;
    time: string;
  }) => {
    console.log('Starting quick play with time control:', timeControl);
  };

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
    <HomeContainer>
      <MainContent>
        <QuickPairing onTimeControlSelect={handleQuickPlay} />
        <GameLobby
          onCreateGame={handleCreateGame}
          onJoinGame={handleJoinGame}
        />
        <StatsSection />
      </MainContent>
    </HomeContainer>
  );
};
