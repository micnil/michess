import { Color } from '@michess/core-board';
import { GameActionType } from './GameActionType';

type DrawReason =
  | 'threefold_repetition'
  | 'fifty_move_rule'
  | 'by_agreement'
  | 'insufficient_material';

export type GameAction = {
  type: GameActionType;
  color?: Color;
  reason?: DrawReason;
};

export const GameAction = {
  acceptDrawThreeFold: (): GameAction => ({
    type: 'accept_draw',
    reason: 'threefold_repetition',
  }),

  acceptDrawFiftyMoveRule: (): GameAction => ({
    type: 'accept_draw',
    reason: 'fifty_move_rule',
  }),

  acceptDrawInsufficientMaterial: (): GameAction => ({
    type: 'accept_draw',
    reason: 'insufficient_material',
  }),

  acceptDraw: (color: Color): GameAction => ({
    type: 'accept_draw',
    reason: 'by_agreement',
    color,
  }),

  rejectDraw: (color: Color): GameAction => ({
    type: 'reject_draw',
    color,
  }),

  offerDraw: (): GameAction => ({
    type: 'offer_draw',
  }),

  resign: (): GameAction => ({
    type: 'resign',
  }),
};
