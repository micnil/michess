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
  justify-content: space-between;
  align-items: center;
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

const PlayerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
`;

const PlayerName = styled.div`
  font-weight: 600;
  color: #374151;
  min-width: 120px;
`;

const GameDetails = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: #6b7280;
  align-items: center;

  @media (max-width: 768px) {
    gap: 0.75rem;
  }
`;

const GameMode = styled.span``;

const TimeControl = styled.span``;

const PlayerRating = styled.span``;

const OnlineIndicator = styled.span`
  &:before {
    content: '●';
    color: #10b981;
    margin-right: 0.25rem;
  }
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
  rating: number;
  gameMode: string;
  timeControl: string;
  isOnline: boolean;
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
    rating: 1845,
    gameMode: 'Standard',
    timeControl: '10+0',
    isOnline: true,
  },
  {
    id: '2',
    playerName: 'KnightRider',
    rating: 1623,
    gameMode: 'Standard',
    timeControl: '5+3',
    isOnline: true,
  },
  {
    id: '3',
    playerName: 'QueenGambit',
    rating: 1987,
    gameMode: 'King of the Hill',
    timeControl: '15+10',
    isOnline: false,
  },
  {
    id: '4',
    playerName: 'PawnStorm',
    rating: 1456,
    gameMode: 'Standard',
    timeControl: '3+2',
    isOnline: true,
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
            <PlayerInfo>
              <PlayerName>{game.playerName}</PlayerName>
              <GameDetails>
                <GameMode>{game.gameMode}</GameMode>
                <TimeControl>{game.timeControl}</TimeControl>
                <PlayerRating>{game.rating}</PlayerRating>
                {game.isOnline && <OnlineIndicator />}
              </GameDetails>
            </PlayerInfo>
            <JoinButton onClick={() => onJoinGame?.(game.id)}>Join</JoinButton>
          </GameCard>
        ))}
      </GameList>
    </GameLobbyContainer>
  );
};
