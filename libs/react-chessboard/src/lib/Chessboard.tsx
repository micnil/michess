import { Color, PiecePlacements } from '@michess/core-models';
import { MovePayload } from '@michess/core-state';
import { DragDropContextProvider } from '@michess/react-dnd';
import { ChessboardView } from './ChessboardView';
import { ChessboardContextProvider } from './context/ChessboardContextProvider';
import { MoveOptions } from './move/model/MoveOptions';
import { GameStatusType } from './model/GameStatusType';

type Props<TMoveMeta = unknown> = {
  orientation?: Color;
  size?: number;
  piecePlacements?: PiecePlacements;
  moveOptions?: MoveOptions<TMoveMeta>;
  gameStatus?: GameStatusType;
  onMove?: (move: MovePayload<TMoveMeta>) => void;
};
export const Chessboard = <TMoveMeta,>({
  orientation,
  size = 500,
  moveOptions,
  piecePlacements,
  gameStatus = 'active',
  onMove,
}: Props<TMoveMeta>) => {
  return (
    <ChessboardContextProvider
      size={size}
      orientation={orientation}
      moveOptions={moveOptions}
      piecePlacements={piecePlacements}
      gameStatus={gameStatus}
      onMove={onMove}
    >
      <DragDropContextProvider>
        <ChessboardView size={size} />
      </DragDropContextProvider>
    </ChessboardContextProvider>
  );
};
