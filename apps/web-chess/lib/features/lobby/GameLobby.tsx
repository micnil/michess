import React from 'react';
import styled from 'styled-components';

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

const GameModeColumn = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  flex: 1;
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

type GameLobbyEntry = {
  id: string;
  playerName: string;
  gameMode: string;
};

type Props = {
  games?: GameLobbyEntry[];
  onCreateGame?: () => void;
  onJoinGame?: (gameId: string) => void;
};

const mockGames: GameLobbyEntry[] = [
  {
    id: '1',
    playerName: 'ChessMaster2024',
    gameMode: 'Standard',
  },
  {
    id: '2',
    playerName: 'KnightRider',
    gameMode: 'Standard',
  },
  {
    id: '3',
    playerName: 'QueenGambit',
    gameMode: 'King of the Hill',
  },
  {
    id: '4',
    playerName: 'PawnStorm',
    gameMode: 'Standard',
  },
];

export const GameLobby: React.FC<Props> = ({
  games = mockGames,
  onCreateGame,
  onJoinGame,
}) => {
  return (
    <GameLobbyContainer>
      <SectionHeader>
        <SectionTitle>Game Lobby</SectionTitle>
        <CreateGameButton onClick={onCreateGame}>Create Game</CreateGameButton>
      </SectionHeader>

      <GameList>
        {games.map((game) => (
          <GameCard key={game.id}>
            <PlayerColumn>{game.playerName}</PlayerColumn>
            <GameModeColumn>{game.gameMode}</GameModeColumn>
            <JoinButton onClick={() => onJoinGame?.(game.id)}>Join</JoinButton>
          </GameCard>
        ))}
      </GameList>
    </GameLobbyContainer>
  );
};
