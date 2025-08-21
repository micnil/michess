import { Maybe } from '@michess/common-utils';
import { ChessGameAction, ChessGameResult, Color } from '@michess/core-models';

type ChessGameActions = {
  addAction: (action: ChessGameAction) => ChessGameActions;
  useAction: (action: ChessGameAction, currentTurn: Color) => ChessGameActions;
  isActionAvailable: (action: ChessGameAction) => boolean;
};

const fromActions = (actions: ChessGameAction[]): ChessGameActions => {
  return {
    addAction: (action: ChessGameAction) => {
      const newActions =
        action.type === 'CLAIM_DRAW'
          ? [...actions.filter((a) => a.type !== 'OFFER_DRAW'), action]
          : [...actions, action];

      return fromActions(newActions);
    },
    useAction: (action: ChessGameAction, currentTurn: Color) => {
      const isValidUsage = actions.some(
        (a) => a.type === action.type && (!a.color || a.color === currentTurn)
      );
      if (isValidUsage) {
        const newActions = actions.filter((a) => a.type !== action.type);

        switch (action.type) {
          case 'OFFER_DRAW': {
            const opponentColor =
              currentTurn === Color.White ? Color.Black : Color.White;
            return fromActions([
              ...newActions,
              ChessGameAction.acceptDraw(opponentColor),
              ChessGameAction.rejectDraw(opponentColor),
            ]);
          }
          case 'REJECT_DRAW': {
            return fromActions([
              ...newActions.filter((a) => a.type !== 'ACCEPT_DRAW'),
              ChessGameAction.offerDraw(),
            ]);
          }
          case 'ACCEPT_DRAW': {
            return fromActions([]);
          }
          case 'RESIGN': {
            return fromActions([]);
          }

          case 'CLAIM_DRAW': {
            return fromActions([]);
          }
        }
      } else {
        return fromActions(actions);
      }
    },
    isActionAvailable: (action: ChessGameAction) =>
      actions.some(
        (a) =>
          a.type === action.type && (!action.color || a.color === action.color)
      ),
  };
};

export const ChessGameActions = {
  fromResult(result: Maybe<ChessGameResult>): ChessGameActions {
    if (!result) {
      return fromActions([
        ChessGameAction.offerDraw(),
        ChessGameAction.resign(),
      ]);
    } else {
      return fromActions([]);
    }
  },

  fromActions,
};
