import { IReadOnlyChessboard, MovePayload } from '@michess/core-state';
import React from 'react';
import { MoveOptionsMap } from '../move/model/MoveOptionsMap';
import { Square } from '../model/Square';

export type ChessboardContextState<TMoveMeta = unknown> = {
  chessboard: IReadOnlyChessboard;
  squares: Square[];
  moveOptionsMap?: MoveOptionsMap;
  movePiece: (payload: MovePayload<TMoveMeta>) => void;
};

export const ChessboardContext = React.createContext<
  ChessboardContextState | undefined
>(undefined);
