import React from 'react';
import { BoardState } from '../../common-types/BoardState';

export const ChessboardContext = React.createContext<BoardState | undefined>(
  undefined
);
