import { Chessboard, Coordinate } from '@michess/core-board';
import React from 'react';
import { GameResultType } from '../model/GameResultType';
import { Square } from '../model/Square';
import { MoveOptionsMap } from '../move/model/MoveOptionsMap';
import { MovePayload } from '../move/model/MovePayload';

export type ChessboardContextState<TMoveMeta = unknown> = {
  chessboard: Chessboard;
  gameResult?: GameResultType;
  squares: Record<Coordinate, Square>;
  moveOptionsMap?: MoveOptionsMap;
  latestMove?: { from: Coordinate; to: Coordinate };
  movePiece: (payload: MovePayload<TMoveMeta>) => void;
};

export const ChessboardContext = React.createContext<
  ChessboardContextState | undefined
>(undefined);
