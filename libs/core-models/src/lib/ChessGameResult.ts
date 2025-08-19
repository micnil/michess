import { Maybe } from '@michess/common-utils';
import { ChessGameResultType } from './ChessGameResultType';

export type ChessGameResult = {
  type: ChessGameResultType;
  // reason?: 'resignation' | 'stalemate' | 'threefold_repetition' | 'fifty_moves';
};

export const ChessGameResult = {
  fromChessGameAction: (action: {
    type: string;
    reason?: string;
  }): Maybe<ChessGameResult> => {
    switch (action.type) {
      case 'CLAIM_DRAW':
        return {
          type: 'draw',
        };
      default:
        return undefined;
    }
  },
  toResultString: (result: Maybe<ChessGameResult>): string => {
    if (result) {
      switch (result.type) {
        case 'white_win':
          return '1-0';
        case 'black_win':
          return '0-1';
        case 'draw':
          return '1/2-1/2';
        default:
          throw new Error(`Unknown game result type: ${result.type}`);
      }
    } else {
      return '0-0';
    }
  },
};
