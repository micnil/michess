import React from 'react';
import styled from 'styled-components';
import { Color } from '@michess/core-models';
import { GameStatusType } from './model/GameStatusType';

const ScoreSheetContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
  width: 200px;
  min-height: 300px;
  font-family: 'Arial', sans-serif;
`;

const Title = styled.h3`
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: #333;
`;

const GameResult = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  padding: 12px;
  margin: 8px 0;
  border-radius: 4px;
  background-color: #fff;
  border: 1px solid #ddd;
`;

const EmptyState = styled.div`
  text-align: center;
  font-size: 16px;
  color: #666;
  padding: 12px;
  margin: 8px 0;
`;

const MovesContainer = styled.div`
  flex: 1;
  margin-top: 16px;
`;

const MovesTitle = styled.h4`
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #666;
`;

type ScoreSheetProps = {
  gameStatus: GameStatusType;
  winner?: Color;
};

const getGameResultDisplay = (
  gameStatus: GameStatusType,
  winner?: Color
): string => {
  if (gameStatus === 'active') {
    return '0-0';
  } else if (gameStatus === 'checkmate') {
    return winner === 'white' ? '1-0' : winner === 'black' ? '0-1' : '1/2-1/2';
  } else if (gameStatus === 'draw') {
    return '1/2-1/2';
  } else {
    return '0-0';
  }
};

const getGameResultText = (
  gameStatus: GameStatusType,
  winner?: Color
): string => {
  if (gameStatus === 'active') {
    return 'Game in progress';
  } else if (gameStatus === 'checkmate') {
    if (winner === 'white') {
      return 'White wins by checkmate';
    } else if (winner === 'black') {
      return 'Black wins by checkmate';
    } else {
      return 'Checkmate';
    }
  } else if (gameStatus === 'draw') {
    return 'Draw';
  } else {
    return 'Game in progress';
  }
};

export const ScoreSheet: React.FC<ScoreSheetProps> = ({
  gameStatus,
  winner,
}) => {
  const resultDisplay = getGameResultDisplay(gameStatus, winner);
  const resultText = getGameResultText(gameStatus, winner);
  const isActive = gameStatus === 'active';

  return (
    <ScoreSheetContainer>
      <Title>Score Sheet</Title>

      {isActive ? (
        <EmptyState>{resultDisplay}</EmptyState>
      ) : (
        <GameResult>
          <div>{resultDisplay}</div>
          <div
            style={{ fontSize: '12px', fontWeight: 'normal', marginTop: '4px' }}
          >
            {resultText}
          </div>
        </GameResult>
      )}

      <MovesContainer>
        <MovesTitle>Moves</MovesTitle>
        {/* TODO: Add move list here in future iterations */}
        <EmptyState style={{ fontSize: '12px', color: '#999' }}>
          Move list coming soon
        </EmptyState>
      </MovesContainer>
    </ScoreSheetContainer>
  );
};
