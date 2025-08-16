import { Maybe } from '@michess/common-utils';
import { ChessPosition } from './ChessPosition';
import { GameResultType } from './GameResultType';
import { Move } from './Move';

export type GameState = ChessPosition & {
  result: Maybe<{
    type: GameResultType;
    // reason?: 'resignation' | 'stalemate' | 'threefold_repetition' | 'fifty_moves';
  }>;
  resultStr: string;
  moveHistory: Move[];
  isRepetition: boolean;
};

export const GameState = {
  fromChessPosition: (chessPosition: ChessPosition): GameState => ({
    ...chessPosition,
    result: undefined,
    resultStr: '0-0',
    moveHistory: [],
    isRepetition: false,
  }),
};
