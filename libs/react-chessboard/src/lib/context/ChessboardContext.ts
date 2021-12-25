import { IReadOnlyChessboard, MovePayload } from '@michess/core-state';
import React from 'react';

export type ChessboardContextState = {
  chessboard: IReadOnlyChessboard;
  movePiece: (payload: MovePayload) => void;
};

export const ChessboardContext = React.createContext<
  ChessboardContextState | undefined
>(undefined);
