import { Color } from '@michess/core-models';
import { DragDropContextProvider } from '@michess/react-dnd';
import { FC } from 'react';
import ChessboardView from './ChessboardView';
import { ChessboardContextProvider } from './context/ChessboardContextProvider';

type Props = {
  orientation: 'black' | 'white';
  size: number;
};
export const Chessboard: FC<Props> = ({ orientation, size }) => {
  return (
    <ChessboardContextProvider
      orientation={orientation === 'white' ? Color.White : Color.Black}
    >
      <DragDropContextProvider>
        <ChessboardView size={size} />
      </DragDropContextProvider>
    </ChessboardContextProvider>
  );
};
