import { Observable } from '@michess/common-utils';
import { Color } from '@michess/core-board';
import styled from 'styled-components';
import { ChessboardView } from './ChessboardView';
import { ChessboardContextProvider } from './context/ChessboardContextProvider';
import { useResponsiveBoardSize } from './hooks/useResponsiveBoardSize';
import { GameStatusType } from './model/GameStatusType';
import { MovePayload } from './model/MovePayload';
import { MoveOptions } from './move/model/MoveOptions';

const ChessboardContainer = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  max-width: 100vw;
  overflow: hidden;
`;

type Props<TMoveMeta = unknown> = {
  orientation?: Color;
  maxSize?: number;
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
  maxSize = 600,
  fromPositionFen,
  gameStatus = 'active',
  winner,
  readonly,
  playableTurn,
  moveHistory,
  moveObservable,
  onMove,
}: Props<TMoveMeta>) => {
  // Use the responsive board size hook
  const boardSize = useResponsiveBoardSize({ maxSize });

  return (
    <ChessboardContainer>
      <ChessboardContextProvider
        size={boardSize}
        orientation={orientation}
        fromPositionFen={fromPositionFen}
        gameStatus={gameStatus}
        readonly={readonly}
        moveHistory={moveHistory}
        playableTurn={playableTurn}
        moveObservable={moveObservable}
        onMove={onMove}
      >
        <ChessboardView size={boardSize} />
      </ChessboardContextProvider>
    </ChessboardContainer>
  );
};
