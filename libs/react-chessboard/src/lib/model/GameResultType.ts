import { Maybe } from '@michess/common-utils';
import { Color } from '@michess/core-board';

export type GameResultType = 'white_win' | 'black_win' | 'draw';

export const GameResultType = {
  toColor: (resultType: Maybe<GameResultType>): Maybe<Color> => {
    if (resultType === 'white_win') return Color.White;
    if (resultType === 'black_win') return Color.Black;
    return undefined;
  },
};
