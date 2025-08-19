export type ChessGameActionType =
  | 'CLAIM_DRAW'
  | 'ACCEPT_DRAW'
  | 'REJECT_DRAW'
  | 'OFFER_DRAW'
  | 'RESIGN';

type DrawReason =
  | 'three-fold-repetition'
  | 'fifty-move-rule'
  | 'insufficient-material'
  | 'stalemate'
  | 'by-agreement';

export type ChessGameAction = {
  type: ChessGameActionType;
  reason?: DrawReason;
  message?: string;
};

export const ChessGameAction = {
  claimDrawThreeFold: (): ChessGameAction => ({
    type: 'CLAIM_DRAW',
    reason: 'three-fold-repetition',
    message: 'Claim draw by threefold repetition',
  }),

  claimDrawFiftyMoveRule: (): ChessGameAction => ({
    type: 'CLAIM_DRAW',
    reason: 'fifty-move-rule',
    message: 'Claim draw by fifty-move rule',
  }),

  acceptDraw: (): ChessGameAction => ({
    type: 'ACCEPT_DRAW',
    reason: 'by-agreement',
    message: 'Accept draw offer',
  }),

  rejectDraw: (): ChessGameAction => ({
    type: 'REJECT_DRAW',
    message: 'Reject draw offer',
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
