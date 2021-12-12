import React from 'react';
import { BoardState } from '../../chess-types/BoardState';

export const ChessboardContext = React.createContext<BoardState | undefined>(
  undefined
);
