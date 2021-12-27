import { Color } from '@michess/core-models';
import { DragDropContextProvider } from '@michess/react-dnd';
import { FC } from 'react';
import ChessboardView from './ChessboardView';
import { ChessboardContextProvider } from './context/ChessboardContextProvider';

type Props = {
  orientation: Color;
  size: number;
};
export const Chessboard: FC<Props> = ({ orientation, size }) => {
  return (
    <ChessboardContextProvider
      orientation={orientation}
    >
      <DragDropContextProvider>
        <ChessboardView size={size} />
      </DragDropContextProvider>
    </ChessboardContextProvider>
  );
};
