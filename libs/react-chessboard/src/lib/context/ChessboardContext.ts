import { Coordinate } from '@michess/core-board';
import { Chessboard } from '@michess/core-game';
import React from 'react';
import { MovePayload } from '../model/MovePayload';
import { Square } from '../model/Square';
import { MoveOptionsMap } from '../move/model/MoveOptionsMap';

export type ChessboardContextState<TMoveMeta = unknown> = {
  chessboard: Chessboard;
  squares: Record<Coordinate, Square>;
  moveOptionsMap?: MoveOptionsMap;
  latestMove?: { from: Coordinate; to: Coordinate };
  movePiece: (payload: MovePayload<TMoveMeta>) => void;
};

export const ChessboardContext = React.createContext<
  ChessboardContextState | undefined
>(undefined);
