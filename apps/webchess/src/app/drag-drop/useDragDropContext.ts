import { useContext } from 'react';
import { DragDropContext, DragDropContextState } from './DragDropContext';

export const useDragDropContext = (): DragDropContextState => {
  const context = useContext(DragDropContext);
  if (!context) {
    throw new Error('Must be used from child of ChessboardContext');
  } else {
    return context;
  }
};
