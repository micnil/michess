import { BoardState, Coordinate } from '@michess/core-models';
import React from 'react';

export type ChessboardContextState = {
  boardState: BoardState;
  movePiece: (pieceId: string, coordinate: Coordinate) => void;
};

export const ChessboardContext = React.createContext<
  ChessboardContextState | undefined
>(undefined);
