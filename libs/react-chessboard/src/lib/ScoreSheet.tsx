import { Color } from '@michess/core-board';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { GameStatusType } from './model/GameStatusType';
import { MovePayload } from './model/MovePayload';
import {
  formatMovesForMobile,
  formatMovesIntoPairs,
} from './util/moveNotation';

const ScoreSheetContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
  width: 200px;
  font-family: 'Arial', sans-serif;

  @media (min-width: 769px) {
    max-height: 70vh;
    overflow: hidden;
  }

  @media (max-width: 768px) {
    width: 90%;
  }
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
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
`;

const MovesTitle = styled.h4`
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #666;
`;

// Shared scrollbar styles
const scrollbarStyles = `
  scrollbar-width: thin;
  scrollbar-color: #ccc #f9f9f9;

  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f9f9f9;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #bbb;
  }
`;

const DesktopMovesList = styled.div`
  display: none;
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  ${scrollbarStyles}

  @media (min-width: 769px) {
    display: block;
  }
`;

const MovePair = styled.div`
  display: flex;
  padding: 2px 0;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.4;

  &:nth-child(even) {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

const MoveNumber = styled.span`
  color: #666;
  width: 24px;
  flex-shrink: 0;
`;

const WhiteMove = styled.span`
  color: #333;
  width: 60px;
  padding-right: 8px;
`;

const BlackMove = styled.span`
  color: #333;
  width: 60px;
`;

const MobileMovesList = styled.div`
  display: block;

  @media (min-width: 769px) {
    display: none;
  }
`;

const HorizontalScrollContainer = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding: 8px 0;
  position: relative;
  ${scrollbarStyles}

  /* Add gradient shadows to indicate scrollability */
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 16px;
    pointer-events: none;
    z-index: 1;
    transition: opacity 0.3s ease;
  }

  /* Left shadow - visible when not at start */
  &::before {
    left: 0;
    background: linear-gradient(
      to right,
      rgba(249, 249, 249, 0.8),
      transparent
    );
    opacity: 0;
  }

  /* Right shadow - visible when not at end */
  &::after {
    right: 0;
    background: linear-gradient(to left, rgba(249, 249, 249, 0.8), transparent);
    opacity: 1;
  }

  /* Show left shadow when scrolled */
  &.scrolled-left::before {
    opacity: 1;
  }

  /* Hide right shadow when at end */
  &.scrolled-right::after {
    opacity: 0;
  }
`;

const IndividualMove = styled.span`
  white-space: nowrap;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  color: #333;
  padding: 4px 8px;
  background-color: rgba(0, 0, 0, 0.03);
  border-radius: 4px;
  flex-shrink: 0;
`;

const MoveSeparator = styled.span`
  white-space: nowrap;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: #666;
  font-weight: bold;
  padding: 4px 2px;
  flex-shrink: 0;
  align-self: center;
`;

type ScoreSheetProps<TMoveMeta = unknown> = {
  gameStatus: GameStatusType;
  winner?: Color;
  moveHistory?: MovePayload<TMoveMeta>[];
};

const getGameResultDisplay = (
  gameStatus: GameStatusType,
  winner?: Color
): string => {
  if (gameStatus === 'active') return '0-0';
  if (gameStatus === 'checkmate')
    return winner === 'white' ? '1-0' : winner === 'black' ? '0-1' : '1/2-1/2';
  if (gameStatus === 'draw') return '1/2-1/2';
  return '0-0';
};

const getGameResultText = (
  gameStatus: GameStatusType,
  winner?: Color
): string => {
  if (gameStatus === 'active') return 'Game in progress';
  if (gameStatus === 'checkmate') {
    if (winner === 'white') return 'White wins by checkmate';
    if (winner === 'black') return 'Black wins by checkmate';
    return 'Checkmate';
  }
  if (gameStatus === 'draw') return 'Draw';
  return 'Game in progress';
};

export const ScoreSheet = <TMoveMeta,>({
  gameStatus,
  winner,
  moveHistory,
}: ScoreSheetProps<TMoveMeta>) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const resultDisplay = getGameResultDisplay(gameStatus, winner);
  const resultText = getGameResultText(gameStatus, winner);
  const isActive = gameStatus === 'active';

  const movePairs = moveHistory ? formatMovesIntoPairs(moveHistory) : [];
  const mobileMoves = moveHistory ? formatMovesForMobile(moveHistory) : [];

  // Handle scroll shadows visibility
  const updateScrollShadows = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const isAtStart = scrollLeft <= 0;
    const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 1; // -1 for rounding

    container.classList.toggle('scrolled-left', !isAtStart);
    container.classList.toggle('scrolled-right', isAtEnd);
  };

  // Auto-scroll mobile moves to latest and update shadows
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container && mobileMoves.length > 0) {
      container.scrollLeft = container.scrollWidth;
      // Update shadows after auto-scroll
      setTimeout(updateScrollShadows, 0);
    }
  }, [mobileMoves.length]);

  // Update shadows on manual scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => updateScrollShadows();
    container.addEventListener('scroll', handleScroll);

    // Initial shadow state
    updateScrollShadows();

    return () => container.removeEventListener('scroll', handleScroll);
  }, [mobileMoves.length]);

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

        {/* Desktop: Two-column layout */}
        <DesktopMovesList>
          {movePairs.length ? (
            movePairs.map((pair, index) => {
              const parts = pair.split(' ');
              const moveNumber = parts[0];
              const whiteMove = parts[1] || '';
              const blackMove = parts[2] || '';

              return (
                <MovePair key={index}>
                  <MoveNumber>{moveNumber}</MoveNumber>
                  <WhiteMove>{whiteMove}</WhiteMove>
                  <BlackMove>{blackMove}</BlackMove>
                </MovePair>
              );
            })
          ) : (
            <EmptyState style={{ fontSize: '12px', color: '#999' }}>
              No moves yet
            </EmptyState>
          )}
        </DesktopMovesList>

        {/* Mobile: Horizontal scroll layout */}
        <MobileMovesList>
          {mobileMoves.length ? (
            <HorizontalScrollContainer ref={scrollContainerRef}>
              {mobileMoves.map((item, index) =>
                item.type === 'separator' ? (
                  <MoveSeparator key={`sep-${index}`}>
                    {item.content}
                  </MoveSeparator>
                ) : (
                  <IndividualMove key={`move-${index}`}>
                    {item.content}
                  </IndividualMove>
                )
              )}
            </HorizontalScrollContainer>
          ) : (
            <EmptyState style={{ fontSize: '12px', color: '#999' }}>
              No moves yet
            </EmptyState>
          )}
        </MobileMovesList>
      </MovesContainer>
    </ScoreSheetContainer>
  );
};
