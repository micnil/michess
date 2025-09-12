import React from 'react';
import styled from 'styled-components';
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
  const handleQuickPlay = (timeControl: {
    id: string;
    type: string;
    time: string;
  }) => {
    console.log('Starting quick play with time control:', timeControl);
    onQuickPlay?.(timeControl);
  };

  const handleCreateGame = () => {
    console.log('Creating new game');
    onCreateGame?.();
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
