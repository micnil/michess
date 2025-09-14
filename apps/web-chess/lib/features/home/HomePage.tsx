import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { useApi } from '../../api/hooks';
import { GameLobby } from '../lobby/GameLobby';
import { QuickPairing } from '../quick-pairing/QuickPairing';
import { StatsSection } from '../stats/StatsSection';

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

type Props = {
  onQuickPlay?: (timeControl: {
    id: string;
    type: string;
    time: string;
  }) => void;
  onCreateGame?: () => void;
  onJoinGame?: (gameId: string) => void;
};

export const HomePage: React.FC<Props> = ({
  onQuickPlay,
  onCreateGame,
  onJoinGame,
}) => {
  const router = useRouter();
  const api = useApi(); // Call hook during render

  const handleQuickPlay = (timeControl: {
    id: string;
    type: string;
    time: string;
  }) => {
    console.log('Starting quick play with time control:', timeControl);
    onQuickPlay?.(timeControl);
  };

  const handleCreateGame = async () => {
    try {
      console.log('Creating new game...');
      const gameDetails = await api.games.createGame(false); // Create public game

      console.log('Game created:', gameDetails);

      // Navigate to the game page
      await router.push(`/game/${gameDetails.id}`);

      onCreateGame?.();
    } catch (error) {
      console.error('Failed to create game:', error);
      // TODO: Show error message to user
    }
  };

  const handleJoinGame = (gameId: string) => {
    console.log('Joining game:', gameId);
    onJoinGame?.(gameId);
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
