import { IReadOnlyChessboard, MovePayload } from '@michess/core-state';
import React from 'react';
import { MoveOptionsMap } from '../model/MoveOptionsMap';

export type ChessboardContextState = {
  chessboard: IReadOnlyChessboard;
  moveOptionsMap?: MoveOptionsMap;
  movePiece: (payload: MovePayload) => void;
};

export const ChessboardContext = React.createContext<
  ChessboardContextState | undefined
>(undefined);
