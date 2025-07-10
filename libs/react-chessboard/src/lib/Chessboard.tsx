import { Color, PiecePlacements } from '@michess/core-models';
import { MovePayload } from '@michess/core-state';
import { DragDropContextProvider } from '@michess/react-dnd';
import { FC } from 'react';
import ChessboardView from './ChessboardView';
import { ChessboardContextProvider } from './context/ChessboardContextProvider';
import { MoveOptions } from './move/model/MoveOptions';

type Props<TMoveMeta = unknown> = {
  orientation?: Color;
  size?: number;
  piecePlacements?: PiecePlacements;
  moveOptions?: MoveOptions<TMoveMeta>;
  onMove?: (move: MovePayload<TMoveMeta>) => void;
};
export const Chessboard = <TMoveMeta,>({
  orientation,
  size = 500,
  moveOptions,
  piecePlacements,
  onMove,
}: Props<TMoveMeta>) => {
  return (
    <ChessboardContextProvider
      orientation={orientation}
      moveOptions={moveOptions}
      piecePlacements={piecePlacements}
      onMove={onMove}
    >
      <DragDropContextProvider>
        <ChessboardView size={size} />
      </DragDropContextProvider>
    </ChessboardContextProvider>
  );
};
