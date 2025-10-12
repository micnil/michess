import { Color } from '@michess/core-board';
import { Chessboard } from '../Chessboard';
import { GameStatusType } from '../model/GameStatusType';
import { GameAction } from './model/GameAction';
import { GameActionIn } from './model/GameActionIn';
import { GameActionOption } from './model/GameActionOption';

type ActionState = {
  board: Chessboard;
  options: GameActionOption[];
  usedActions: GameAction[];
};

export class ChessGameActions {
  constructor(private state: ActionState) {}

  private findActionOptionIndex = (
    actionIn: GameActionIn,
    color: Color
  ): number =>
    this.state.options.findIndex(
      (a) =>
        a.type === actionIn.type && (!a.availableTo || a.availableTo === color)
    );

  value(): GameActionOption[] {
    return this.state.options;
  }

  addOption(option: GameActionOption): ChessGameActions {
    const newOptions =
      option.type === 'accept_draw'
        ? [
            ...this.state.options.filter(
              (a) => a.type !== 'offer_draw' && a.type !== 'accept_draw'
            ),
            option,
          ]
        : [...this.state.options, option];

    return new ChessGameActions({
      options: newOptions,
      usedActions: this.state.usedActions,
      board: this.state.board,
    });
  }

  useAction(color: Color, actionIn: GameActionIn): ChessGameActions {
    const actionOptionIndex = this.findActionOptionIndex(actionIn, color);
    if (actionOptionIndex !== -1) {
      const usedOption = this.state.options[actionOptionIndex];
      const newOptions = this.state.options.toSpliced(actionOptionIndex, 1);
      const newUsedActions: GameAction[] = [
        ...this.state.usedActions,
        GameAction.from(color, this.state.board.movesRecord.length, usedOption),
      ];

      switch (actionIn.type) {
        case 'offer_draw': {
          const opponentColor = Color.opposite(color);
          return new ChessGameActions({
            options: [
              ...newOptions,
              GameActionOption.acceptDraw(opponentColor),
            ],
            usedActions: newUsedActions,
            board: this.state.board,
          });
        }
        case 'accept_draw': {
          return new ChessGameActions({
            options: [],
            usedActions: newUsedActions,
            board: this.state.board,
          });
        }
        case 'resign': {
          return new ChessGameActions({
            options: [],
            usedActions: newUsedActions,
            board: this.state.board,
          });
        }
      }
    } else {
      return new ChessGameActions(this.state);
    }
  }

  isActionAvailable(playerColor: Color, action: GameActionIn): boolean {
    return this.findActionOptionIndex(action, playerColor) !== -1;
  }

  updateBoard(status: GameStatusType, board: Chessboard): ChessGameActions {
    return ChessGameActions.from(this.state.usedActions, board, status);
  }

  get usedActions(): GameAction[] {
    return this.state.usedActions;
  }

  static from(
    actionsIn: GameAction[],
    board: Chessboard,
    status: GameStatusType
  ): ChessGameActions {
    if (status !== 'IN_PROGRESS') {
      return new ChessGameActions({
        options: [],
        usedActions: actionsIn,
        board,
      });
    } else {
      const moveNumber = board.movesRecord.length;

      const firstMoveThisTurn = actionsIn.findIndex(
        (a) => a.moveNumber === moveNumber
      );

      const actionsThisTurn =
        firstMoveThisTurn !== -1 ? actionsIn.slice(firstMoveThisTurn) : [];
      const actionsBeforeThisTurn =
        firstMoveThisTurn !== -1
          ? actionsIn.slice(0, firstMoveThisTurn)
          : actionsIn;

      let actions = new ChessGameActions({
        usedActions: actionsBeforeThisTurn,
        options: [GameActionOption.offerDraw(), GameActionOption.resign()],
        board,
      });

      actions = board.isThreeFoldRepetition
        ? actions.addOption(GameActionOption.acceptDrawThreeFold())
        : actions;
      actions = board.isFiftyMoveRule
        ? actions.addOption(GameActionOption.acceptDrawFiftyMoveRule())
        : actions;
      actions = board.isInsufficientMaterial
        ? actions.addOption(GameActionOption.acceptDrawInsufficientMaterial())
        : actions;

      return actionsThisTurn.reduce((acc, action) => {
        return acc.useAction(action.color, action);
      }, actions);
    }
  }
}
