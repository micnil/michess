import React from 'react';
import styled from 'styled-components';

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    gap: 1rem;
    padding: 1rem;
  }
`;

const StatCard = styled.div`
  text-align: center;
  padding: 1rem;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
`;

type StatsData = {
  activePlayers: number;
  gamesInLobby: number;
  gamesToday: number;
};

type Props = {
  stats?: StatsData;
};

const defaultStats: StatsData = {
  activePlayers: 1247,
  gamesInLobby: 23,
  gamesToday: 8492,
};

export const StatsSection: React.FC<Props> = ({ stats = defaultStats }) => {
  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  return (
    <StatsContainer>
      <StatCard>
        <StatNumber>{formatNumber(stats.activePlayers)}</StatNumber>
        <StatLabel>Active Players</StatLabel>
      </StatCard>

      <StatCard>
        <StatNumber>{formatNumber(stats.gamesInLobby)}</StatNumber>
        <StatLabel>Games in Lobby</StatLabel>
      </StatCard>

      <StatCard>
        <StatNumber>{formatNumber(stats.gamesToday)}</StatNumber>
        <StatLabel>Games Today</StatLabel>
      </StatCard>
    </StatsContainer>
  );
};
