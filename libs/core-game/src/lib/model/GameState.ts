import { Maybe } from '@michess/common-utils';
import { ChessGameResult } from './ChessGameResult';
import { ChessPosition, Move } from '@michess/core-models';

export type GameState = ChessPosition & {
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
