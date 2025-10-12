import { Color } from '@michess/core-board';
import { DrawReasonType } from './DrawReasonType';

export type GameActionOption = { availableTo?: Color } & (
  | {
      type: 'offer_draw';
    }
  | {
      type: 'accept_draw';
      reason: DrawReasonType;
    }
  | {
      type: 'resign';
    }
);

export const GameActionOption = {
  acceptDrawThreeFold: (): GameActionOption => ({
    type: 'accept_draw',
    reason: 'threefold_repetition',
  }),

  acceptDrawFiftyMoveRule: (): GameActionOption => ({
    type: 'accept_draw',
    reason: 'fifty_move_rule',
  }),

  acceptDrawInsufficientMaterial: (): GameActionOption => ({
    type: 'accept_draw',
    reason: 'insufficient_material',
  }),

  acceptDraw: (color: Color): GameActionOption => ({
    type: 'accept_draw',
    reason: 'by_agreement',
    availableTo: color,
  }),

  offerDraw: (): GameActionOption => ({
    type: 'offer_draw',
  }),

  resign: (): GameActionOption => ({
    type: 'resign',
  }),
};
