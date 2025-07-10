import { IReadOnlyChessboard, MovePayload } from '@michess/core-state';
import React from 'react';
import { MoveOptionsMap } from '../move/model/MoveOptionsMap';

export type ChessboardContextState<TMoveMeta = unknown> = {
  chessboard: IReadOnlyChessboard;
  moveOptionsMap?: MoveOptionsMap;
  movePiece: (payload: MovePayload<TMoveMeta>) => void;
};

export const ChessboardContext = React.createContext<
  ChessboardContextState | undefined
>(undefined);
