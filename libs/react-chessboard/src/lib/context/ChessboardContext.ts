import React from 'react';
import { MoveOptionsMap } from '../move/model/MoveOptionsMap';
import { Square } from '../model/Square';
import { Coordinate } from '@michess/core-models';
import { IReadOnlyChessboard } from '../model/IReadOnlyChessboard';
import { MovePayload } from '../model/MovePayload';

export type ChessboardContextState<TMoveMeta = unknown> = {
  chessboard: IReadOnlyChessboard;
  squares: Square[];
  moveOptionsMap?: MoveOptionsMap;
  latestMove?: { from: Coordinate; to: Coordinate };
  movePiece: (payload: MovePayload<TMoveMeta>) => void;
};

export const ChessboardContext = React.createContext<
  ChessboardContextState | undefined
>(undefined);
