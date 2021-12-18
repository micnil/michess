import { useContext } from 'react';
import { ChessboardContext, ChessboardContextState } from './ChessboardContext';

export const useChessboardContext = (): ChessboardContextState => {
  const context = useContext(ChessboardContext);
  if (!context) {
    throw new Error('Must be used from child of ChessboardContext');
  } else {
    return context;
  }
};
