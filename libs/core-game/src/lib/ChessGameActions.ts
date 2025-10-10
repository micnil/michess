import { Maybe } from '@michess/common-utils';
import { Color } from '@michess/core-board';
import { ChessGameResult } from './model/ChessGameResult';
import { GameAction } from './model/GameAction';

export type ChessGameActions = {
  addAction: (action: GameAction) => ChessGameActions;
  useAction: (action: GameAction, currentTurn: Color) => ChessGameActions;
  isActionAvailable: (action: GameAction, playerColor: Color) => boolean;
  value: () => GameAction[];
};

const fromActions = (actions: GameAction[]): ChessGameActions => {
  return {
    value: () => actions,
    addAction: (action: GameAction) => {
      const newActions =
        action.type === 'accept_draw'
          ? [
              ...actions.filter(
                (a) => a.type !== 'offer_draw' && a.type !== 'accept_draw'
              ),
              action,
            ]
          : [...actions, action];

      return fromActions(newActions);
    },
    useAction: (action: GameAction, playerColor: Color) => {
      const isValidUsage = actions.some(
        (a) => a.type === action.type && (!a.color || a.color === playerColor)
      );
      if (isValidUsage) {
        const newActions = actions.filter((a) => a.type !== action.type);

        switch (action.type) {
          case 'offer_draw': {
            const opponentColor =
              playerColor === Color.White ? Color.Black : Color.White;
            return fromActions([
              ...newActions,
              GameAction.acceptDraw(opponentColor),
              GameAction.rejectDraw(opponentColor),
            ]);
          }
          case 'reject_draw': {
            return fromActions([
              ...newActions.filter((a) => a.type !== 'accept_draw'),
              GameAction.offerDraw(),
            ]);
          }
          case 'accept_draw': {
            return fromActions([]);
          }
          case 'resign': {
            return fromActions([]);
          }
        }
      } else {
        return fromActions(actions);
      }
    },
    isActionAvailable: (action: GameAction, playerColor: Color) =>
      actions.some(
        (a) =>
          a.type === action.type && (!action.color || a.color === playerColor)
      ),
  };
};

export const ChessGameActions = {
  fromResult(result: Maybe<ChessGameResult>): ChessGameActions {
    if (!result) {
      return fromActions([GameAction.offerDraw(), GameAction.resign()]);
    } else {
      return fromActions([]);
    }
  },

  fromActions,
};
