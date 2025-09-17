import { Observable } from '@michess/common-utils';
import { Color } from '@michess/core-board';
import { DragDropContextProvider } from '@michess/react-dnd';
import styled from 'styled-components';
import { ChessboardView } from './ChessboardView';
import { ChessboardContextProvider } from './context/ChessboardContextProvider';
import { GameStatusType } from './model/GameStatusType';
import { MovePayload } from './model/MovePayload';
import { MoveOptions } from './move/model/MoveOptions';
import { ScoreSheet } from './ScoreSheet';

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
  fromPositionFen?: string;
  moveOptions?: MoveOptions<TMoveMeta>;
  gameStatus?: GameStatusType;
  winner?: Color;
  playableTurn?: Color;
  readonly?: boolean;
  moveHistory?: MovePayload<TMoveMeta>[];
  moveObservable?: Observable<MovePayload<TMoveMeta>>;
  onMove?: (move: MovePayload<TMoveMeta>) => Promise<boolean>;
};
export const Chessboard = <TMoveMeta,>({
  orientation = 'white',
  size = 500,
  fromPositionFen,
  gameStatus = 'active',
  winner,
  readonly,
  playableTurn,
  moveHistory,
  moveObservable,
  onMove,
}: Props<TMoveMeta>) => {
  return (
    <ChessboardContainer>
      <ChessboardContextProvider
        size={size}
        orientation={orientation}
        fromPositionFen={fromPositionFen}
        gameStatus={gameStatus}
        readonly={readonly}
        moveHistory={moveHistory}
        playableTurn={playableTurn}
        moveObservable={moveObservable}
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
