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
  moves: Move[];
};
