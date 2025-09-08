import { Maybe } from '@michess/common-utils';
import { ChessPosition, MoveRecord } from '@michess/core-board';
import { ChessGameResult } from './ChessGameResult';

export type GameState = {
  result: Maybe<ChessGameResult>;
  resultStr: string;
  initialPosition: ChessPosition;
  moveHistory: MoveRecord[];
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
