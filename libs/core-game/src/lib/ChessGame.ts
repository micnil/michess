import { Maybe } from '@michess/common-utils';
import { ChessPosition, Color, Move } from '@michess/core-board';
import { Chessboard } from './Chessboard';
import { ChessGameActions } from './ChessGameActions';
import { ChessGameAction } from './model/ChessGameAction';
import { ChessGameResult } from './model/ChessGameResult';
import { GameState } from './model/GameState';

type GameStateInternal = {
  additionalActions: ChessGameActions;
  result: Maybe<ChessGameResult>;
  board: Chessboard;
};

export type ChessGame = {
  getState(): GameState;
  getAdditionalActions(): ChessGameAction[];
  makeAction(action: ChessGameAction, playerColor: Color): ChessGame;
  getPosition(): ChessPosition;
  play(moveRecord: Move): ChessGame;
  setResult(result: ChessGameResult): ChessGame;
};

const evalAdditionalActions = (
  previousActions: ChessGameActions,
  board: Chessboard
): ChessGameActions => {
  let additionalActions = previousActions;
  additionalActions = board.isThreeFoldRepetition
    ? additionalActions.addAction(ChessGameAction.claimDrawThreeFold())
    : additionalActions;
  additionalActions = board.isFiftyMoveRule
    ? additionalActions.addAction(ChessGameAction.claimDrawFiftyMoveRule())
    : additionalActions;
  additionalActions = board.isInsufficientMaterial
    ? additionalActions.addAction(
        ChessGameAction.claimDrawInsufficientMaterial()
      )
    : additionalActions;
  return additionalActions;
};

const makeAction = (
  gameState: GameStateInternal,
  action: ChessGameAction,
  playerColor: Color
): {
  gameState: GameStateInternal;
} => {
  if (gameState.additionalActions.isActionAvailable(action, playerColor)) {
    const newActions = gameState.additionalActions.useAction(
      action,
      playerColor
    );
    switch (action.type) {
      case 'CLAIM_DRAW':
      case 'ACCEPT_DRAW':
      case 'RESIGN':
        return {
          gameState: {
            ...gameState,
            result: ChessGameResult.fromChessGameAction(
              action,
              gameState.board.position.turn
            ),
            additionalActions: newActions,
          },
        };
      case 'OFFER_DRAW':
      case 'REJECT_DRAW':
        return {
          gameState: {
            ...gameState,
            additionalActions: newActions,
          },
        };
      default:
        return {
          gameState,
        };
    }
  } else {
    throw new Error(
      `Action ${action.type} is not available for turn ${gameState.board.position.turn}`
    );
  }
};

const evalResultFromBoard = (
  board: Chessboard
): ChessGameResult | undefined => {
  if (board.isCheckmate) {
    return ChessGameResult.toCheckmate(
      board.position.turn === Color.White ? Color.Black : Color.White
    );
  } else if (board.isStalemate) {
    return { type: 'draw' };
  } else {
    return undefined;
  }
};

const fromGameStateInternal = (
  gameStateInternal: GameStateInternal
): ChessGame => {
  const { board, additionalActions, result } = gameStateInternal;
  const getState = (): GameState => {
    return {
      initialPosition: board.initialPosition,
      moveHistory: board.moveRecord,
      result,
      resultStr: ChessGameResult.toResultString(result),
    };
  };
  const playMove = (move: Move): ChessGame => {
    if (result) {
      throw new Error('Game is already over');
    } else {
      const newBoard = board.playMove(move);
      return fromGameStateInternal({
        board: newBoard,
        result: evalResultFromBoard(newBoard),
        additionalActions: evalAdditionalActions(additionalActions, newBoard),
      });
    }
  };
  return {
    getPosition: () => board.position,
    makeAction: (action: ChessGameAction, playerColor: Color): ChessGame => {
      const { gameState } = makeAction(gameStateInternal, action, playerColor);
      return fromGameStateInternal(gameState);
    },
    getState,
    play: playMove,
    setResult: (result: ChessGameResult): ChessGame => {
      return fromGameStateInternal({
        board,
        result,
        additionalActions: ChessGameActions.fromResult(result),
      });
    },
    getAdditionalActions: () => gameStateInternal.additionalActions.value(),
  };
};

const fromChessPosition = (chessPosition: ChessPosition): ChessGame => {
  return fromGameState(GameState.fromChessPosition(chessPosition));
};

const fromGameState = (gameState: GameState): ChessGame => {
  const board = Chessboard.fromPosition(
    gameState.initialPosition,
    gameState.moveHistory
  );
  const result = gameState.result || evalResultFromBoard(board);
  return fromGameStateInternal({
    board,
    result,
    additionalActions: ChessGameActions.fromResult(result),
  });
};

export const ChessGame = {
  fromChessPosition,
  fromGameState,
};
