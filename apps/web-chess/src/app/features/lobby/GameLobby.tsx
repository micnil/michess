import { useQuery } from '@tanstack/react-query';
import React, { use } from 'react';
import styled from 'styled-components';
import { ApiContext } from '../../api/context/ApiContext';

const GameLobbyContainer = styled.div`
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
`;

const CreateGameButton = styled.button`
  background-color: #374151;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #4b5563;
  }

  &:before {
    content: '+';
    margin-right: 0.5rem;
    font-weight: 700;
  }
`;

const GameList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

const GameCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background-color: #fafafa;
  border-radius: 6px;
  border: 1px solid #f0f0f0;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
    border-color: #e5e5e5;
  }
`;

const PlayerColumn = styled.div`
  font-weight: 600;
  color: #374151;
  min-width: 120px;
`;

const ColorColumn = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 100px;
`;

const ColorIndicator = styled.div<{ $color: 'white' | 'black' | 'spectator' }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #333;
  background-color: ${(props) =>
    props.$color === 'white'
      ? '#ffffff'
      : props.$color === 'black'
      ? '#333333'
      : 'transparent'};
  ${(props) =>
    props.$color === 'spectator' &&
    `
    background: linear-gradient(45deg, #333 50%, #fff 50%);
  `}
`;

const ColorLabel = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
  text-transform: capitalize;
`;

const VariantColumn = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  flex: 1;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6b7280;
`;

const JoinButton = styled.button`
  background-color: #374151;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #4b5563;
  }
`;

type Props = {
  onCreateGame?: () => void;
  onJoinGame?: (gameId: string) => void;
};

export const GameLobby: React.FC<Props> = ({ onCreateGame, onJoinGame }) => {
  const api = use(ApiContext);

  const {
    data: lobbyData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['lobby-games'],
    queryFn: () => api.games.getLobbyGames(1),
  });

  const renderHeader = () => (
    <SectionHeader>
      <SectionTitle>Game Lobby</SectionTitle>
      <CreateGameButton onClick={onCreateGame}>Create Game</CreateGameButton>
    </SectionHeader>
  );

  if (isLoading) {
    return (
      <GameLobbyContainer>
        {renderHeader()}
        <EmptyState>Loading games...</EmptyState>
      </GameLobbyContainer>
    );
  }

  if (error) {
    return (
      <GameLobbyContainer>
        {renderHeader()}
        <EmptyState>Error loading games: {(error as Error).message}</EmptyState>
      </GameLobbyContainer>
    );
  }

  const games = lobbyData?.items || [];

  return (
    <GameLobbyContainer>
      {renderHeader()}

      <GameList>
        {games.map((game) => (
          <GameCard key={game.id}>
            <PlayerColumn>{game.opponent.name}</PlayerColumn>
            <ColorColumn>
              <ColorIndicator $color={game.availableColor} />
              <ColorLabel>{game.availableColor}</ColorLabel>
            </ColorColumn>
            <VariantColumn>{game.variant}</VariantColumn>
            <JoinButton onClick={() => onJoinGame?.(game.id)}>Join</JoinButton>
          </GameCard>
        ))}
        {games.length === 0 && (
          <EmptyState>
            No games available. Create one to get started!
          </EmptyState>
        )}
      </GameList>
    </GameLobbyContainer>
  );
};
