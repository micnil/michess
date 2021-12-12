import { useContext } from 'react';
import { BoardState } from '../../chess-types/BoardState';
import { ChessboardContext } from './ChessboardContext';

export const useChessboardContext = (): BoardState => {
  const context = useContext(ChessboardContext);
  if (!context) {
    throw new Error('Must be used from child of ChessboardContext');
  } else {
    return context;
  }
};
