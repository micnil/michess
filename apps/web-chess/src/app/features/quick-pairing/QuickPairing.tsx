import React from 'react';
import styled from 'styled-components';
import { Button } from '../../components';

const QuickPairingContainer = styled.div`
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
  margin-top: 0;
`;

const TimeControlsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

const TimeControlCard = styled.div`
  border-radius: 6px;
  padding: 1.25rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid #e5e7eb;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-color: #d1d5db;
  }
`;

const BulletCard = styled(TimeControlCard)`
  background-color: #fef2f2;
  border-color: #fecaca;

  &:hover {
    background-color: #fee2e2;
    border-color: #fca5a5;
  }
`;

const BlitzCard = styled(TimeControlCard)`
  background-color: #fffbeb;
  border-color: #fed7aa;

  &:hover {
    background-color: #fef3c7;
    border-color: #fbbf24;
  }
`;

const RapidCard = styled(TimeControlCard)`
  background-color: #f0fdf4;
  border-color: #bbf7d0;

  &:hover {
    background-color: #dcfce7;
    border-color: #86efac;
  }
`;

const TimeFormat = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;

const TimeLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  color: #6b7280;
`;

const TimeValue = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: #374151;
`;

type TimeControlOption = {
  id: string;
  label: string;
  time: string;
  type: 'bullet' | 'blitz' | 'rapid';
};

const timeControls: TimeControlOption[] = [
  { id: 'bullet-1+0', label: 'bullet', time: '1+0', type: 'bullet' },
  { id: 'blitz-3+2', label: 'blitz', time: '3+2', type: 'blitz' },
  { id: 'rapid-10+0', label: 'rapid', time: '10+0', type: 'rapid' },
];

type Props = {
  onTimeControlSelect?: (timeControl: TimeControlOption) => void;
};

export const QuickPairing: React.FC<Props> = ({ onTimeControlSelect }) => {
  const handleTimeControlClick = (timeControl: TimeControlOption) => {
    onTimeControlSelect?.(timeControl);
  };

  const getCardComponent = (type: string) => {
    switch (type) {
      case 'bullet':
        return BulletCard;
      case 'blitz':
        return BlitzCard;
      case 'rapid':
        return RapidCard;
      default:
        return TimeControlCard;
    }
  };

  return (
    <QuickPairingContainer>
      <SectionTitle>Quick Pairing</SectionTitle>
      <TimeControlsGrid>
        {timeControls.map((timeControl) => {
          const CardComponent = getCardComponent(timeControl.type);
          return (
            <CardComponent key={timeControl.id}>
              <TimeFormat>
                <TimeLabel>{timeControl.label}</TimeLabel>
                <TimeValue>{timeControl.time}</TimeValue>
              </TimeFormat>
              <Button
                size="large"
                fullWidth
                onClick={() => handleTimeControlClick(timeControl)}
              >
                Play
              </Button>
            </CardComponent>
          );
        })}
      </TimeControlsGrid>
    </QuickPairingContainer>
  );
};
