import React from 'react';
import { BoardState } from '../../chess-types/BoardState';

export type ChessboardContextState = {
  boardState: BoardState,
  movePiece: (pieceId: string, toIndex: number) => void
}

export const ChessboardContext = React.createContext<ChessboardContextState | undefined>(
  undefined
);
