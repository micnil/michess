import { Color, PiecePlacements } from '@michess/core-board';
import { DragDropContextProvider } from '@michess/react-dnd';
import styled from 'styled-components';
import { ChessboardView } from './ChessboardView';
import { ChessboardContextProvider } from './context/ChessboardContextProvider';
import { MoveOptions } from './move/model/MoveOptions';
import { GameStatusType } from './model/GameStatusType';
import { ScoreSheet } from './ScoreSheet';
import { MovePayload } from './model/MovePayload';

const ChessboardContainer = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
`;

type Props<TMoveMeta = unknown> = {
  orientation?: Color;
  size?: number;
  piecePlacements?: PiecePlacements;
  moveOptions?: MoveOptions<TMoveMeta>;
  gameStatus?: GameStatusType;
  winner?: Color;
  moveHistory?: MovePayload<TMoveMeta>[];
  onMove?: (move: MovePayload<TMoveMeta>) => void;
};
export const Chessboard = <TMoveMeta,>({
  orientation,
  size = 500,
  moveOptions,
  piecePlacements,
  gameStatus = 'active',
  winner,
  moveHistory,
  onMove,
}: Props<TMoveMeta>) => {
  return (
    <ChessboardContainer>
      <ChessboardContextProvider
        size={size}
        orientation={orientation}
        moveOptions={moveOptions}
        piecePlacements={piecePlacements}
        gameStatus={gameStatus}
        moveHistory={moveHistory}
        onMove={onMove}
      >
        <DragDropContextProvider>
          <ChessboardView size={size} />
        </DragDropContextProvider>
      </ChessboardContextProvider>
      <ScoreSheet gameStatus={gameStatus} winner={winner} />
    </ChessboardContainer>
  );
};
