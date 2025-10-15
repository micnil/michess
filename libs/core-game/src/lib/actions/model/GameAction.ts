import { Color } from '@michess/core-board';
import { DrawReasonType } from './DrawReasonType';
import { GameActionOption } from './GameActionOption';

export type GameAction = {
  color: Color;
  moveNumber: number;
} & (
  | { type: 'accept_draw'; reason: DrawReasonType }
  | { type: 'offer_draw' }
  | { type: 'resign' }
);

const from = (
  color: Color,
  moveNumber: number,
  option: GameActionOption,
): GameAction => {
  switch (option.type) {
    case 'accept_draw':
      return { color, moveNumber, type: 'accept_draw', reason: option.reason };
    case 'offer_draw':
      return { color, moveNumber, type: 'offer_draw' };
    case 'resign':
      return { color, moveNumber, type: 'resign' };
  }
};

export const GameAction = {
  from,
};
