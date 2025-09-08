import { Maybe } from '@michess/common-utils';
import { ChessPosition, Move } from '@michess/core-board';
import { ChessGameResult } from './ChessGameResult';

export type GameState = {
  result: Maybe<ChessGameResult>;
  resultStr: string;
  initialPosition: ChessPosition;
  moveHistory: Move[];
};

export const GameState = {
  fromChessPosition: (chessPosition: ChessPosition): GameState => ({
    ...chessPosition,
    initialPosition: chessPosition,
    result: undefined,
    resultStr: '0-0',
    moveHistory: [],
  }),
};
