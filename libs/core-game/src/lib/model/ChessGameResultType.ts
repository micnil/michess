import { Color } from '@michess/core-board';

export type ChessGameResultType = 'white_win' | 'black_win' | 'draw';

const toScore = (resultType: ChessGameResultType, color: Color): number => {
  switch (resultType) {
    case 'white_win':
      return color === 'white' ? 1 : 0;
    case 'black_win':
      return color === 'black' ? 1 : 0;
    case 'draw':
      return 0.5;
  }
};
export const ChessGameResultType = {
  toScore,
};
