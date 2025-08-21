import { Color } from './Color';

export type ChessGameActionType =
  | 'CLAIM_DRAW'
  | 'ACCEPT_DRAW'
  | 'REJECT_DRAW'
  | 'OFFER_DRAW'
  | 'RESIGN';

type DrawReason = 'THREE_FOLD_REPETITION' | 'FIFTY_MOVE_RULE' | 'BY_AGREEMENT';

export type ChessGameAction = {
  type: ChessGameActionType;
  color?: Color;
  reason?: DrawReason;
  message?: string;
};

export const ChessGameAction = {
  claimDrawThreeFold: (): ChessGameAction => ({
    type: 'CLAIM_DRAW',
    reason: 'THREE_FOLD_REPETITION',
    message: 'Claim draw by threefold repetition',
  }),

  claimDrawFiftyMoveRule: (): ChessGameAction => ({
    type: 'CLAIM_DRAW',
    reason: 'FIFTY_MOVE_RULE',
    message: 'Claim draw by fifty-move rule',
  }),

  acceptDraw: (color: Color): ChessGameAction => ({
    type: 'ACCEPT_DRAW',
    reason: 'BY_AGREEMENT',
    message: 'Accept draw offer',
    color,
  }),

  rejectDraw: (color: Color): ChessGameAction => ({
    type: 'REJECT_DRAW',
    message: 'Reject draw offer',
    color,
  }),

  offerDraw: (): ChessGameAction => ({
    type: 'OFFER_DRAW',
    message: 'Offer draw to opponent',
  }),

  resign: (): ChessGameAction => ({
    type: 'RESIGN',
    message: 'Resign the game',
  }),
};
