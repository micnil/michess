import { Observable } from '@michess/common-utils';
import { Color } from '@michess/core-board';
import { ChessboardView } from './ChessboardView';
import { ChessboardContextProvider } from './context/ChessboardContextProvider';
import { useResponsiveBoardSize } from './hooks/useResponsiveBoardSize';
import { GameStatusType } from './model/GameStatusType';
import { MovePayload } from './model/MovePayload';
import { MoveOptions } from './move/model/MoveOptions';

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
  winner: _winner,
  readonly,
  playableTurn,
  moveHistory,
  moveObservable,
  onMove,
}: Props<TMoveMeta>) => {
  const boardSize = useResponsiveBoardSize({ maxSize });

  return (
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
  );
};
