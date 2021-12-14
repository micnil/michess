import React from 'react';
import { BoardState } from '../../chess-types/BoardState';
import { Coordinate } from '../../chess-types/Coordinate';

export type ChessboardContextState = {
  boardState: BoardState,
  movePiece: (pieceId: string, coordinate: Coordinate) => void
}

export const ChessboardContext = React.createContext<ChessboardContextState | undefined>(
  undefined
);
