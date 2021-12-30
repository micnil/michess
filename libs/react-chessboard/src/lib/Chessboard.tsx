import { Color, PiecePlacements } from '@michess/core-models';
import { DragDropContextProvider } from '@michess/react-dnd';
import { FC } from 'react';
import ChessboardView from './ChessboardView';
import { ChessboardContextProvider } from './context/ChessboardContextProvider';

type Props = {
  orientation?: Color;
  size?: number;
  piecePlacements?: PiecePlacements;
};
export const Chessboard: FC<Props> = ({ orientation, size = 500 }) => {
  return (
    <ChessboardContextProvider orientation={orientation} >
      <DragDropContextProvider>
        <ChessboardView size={size} />
      </DragDropContextProvider>
    </ChessboardContextProvider>
  );
};
