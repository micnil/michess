import { Maybe } from '@michess/common-utils';
import { Color } from '@michess/core-board';
import { GameActionOption } from '../actions/model/GameActionOption';
import { ChessGameResultType } from './ChessGameResultType';

export type ChessGameResult = {
  type: ChessGameResultType;
  // reason?: 'resignation' | 'stalemate' | 'threefold_repetition' | 'fifty_moves';
};

export const ChessGameResult = {
  fromChessGameAction: (
    action: GameActionOption,
    turn: Color,
  ): Maybe<ChessGameResult> => {
    switch (action.type) {
      case 'accept_draw':
        return {
          type: 'draw',
        };
      case 'resign':
        return {
          type: turn === Color.White ? 'white_win' : 'black_win',
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
  toCheckmate: (winner: Color): ChessGameResult => {
    return {
      type: winner === Color.White ? 'white_win' : 'black_win',
    };
  },
};
