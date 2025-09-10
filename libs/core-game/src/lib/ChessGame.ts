import { isDefined, Maybe } from '@michess/common-utils';
import { ChessPosition, Color, Move } from '@michess/core-board';
import { Chessboard } from './Chessboard';
import { ChessGameActions } from './ChessGameActions';
import { ChessGameAction } from './model/ChessGameAction';
import { ChessGameResult } from './model/ChessGameResult';
import { GameMeta } from './model/GameMeta';
import { GamePlayers } from './model/GamePlayers';
import { GameState } from './model/GameState';
import { GameStatusType } from './model/GameStatusType';
import { PlayerInfo } from './model/PlayerInfo';

type GameStateInternal = {
  meta: GameMeta;
  players: GamePlayers;
  status: GameStatusType;
  additionalActions: ChessGameActions;
  result: Maybe<ChessGameResult>;
  board: Chessboard;
};

export type ChessGame = {
  getState(): GameState;
  getAdditionalActions(): ChessGameAction[];
  makeAction(action: ChessGameAction, playerColor: Color): ChessGame;
  getPosition(): ChessPosition;
  play(movesRecord: Move): ChessGame;
  setResult(result: ChessGameResult): ChessGame;
  joinGame(playerInfo: PlayerInfo, side?: Color): ChessGame;
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

const joinGame = (
  players: GamePlayers,
  playerInfo: PlayerInfo,
  color?: Color
): GamePlayers => {
  const availableSides: Color[] = [
    players.white ? null : ('white' as const),
    players.black ? null : ('black' as const),
  ].filter(isDefined);

  const sideToJoin =
    color ?? availableSides[Math.floor(Math.random() * availableSides.length)];

  if (sideToJoin === 'white' && players.white === undefined) {
    return {
      ...players,
      white: { id: playerInfo.id, name: playerInfo.name },
    };
  } else if (sideToJoin === 'black' && players.black === undefined) {
    return {
      ...players,
      black: { id: playerInfo.id, name: playerInfo.name },
    };
  } else {
    throw new Error('Invalid side or side already taken');
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
      ...gameStateInternal.meta,
      players: gameStateInternal.players,
      status: gameStateInternal.status,
      initialPosition: board.initialPosition,
      movesRecord: board.movesRecord,
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
        ...gameStateInternal,
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
        ...gameStateInternal,
        result,
        additionalActions: ChessGameActions.fromResult(result),
      });
    },
    getAdditionalActions: () => gameStateInternal.additionalActions.value(),
    joinGame: (playerInfo: PlayerInfo, side?: Color): ChessGame => {
      const newPlayers = joinGame(gameStateInternal.players, playerInfo, side);
      return fromGameStateInternal({
        ...gameStateInternal,
        players: newPlayers,
        status: newPlayers.black && newPlayers.white ? 'READY' : 'WAITING',
      });
    },
  };
};

const fromChessPosition = (chessPosition: ChessPosition): ChessGame => {
  return fromGameState(GameState.fromChessPosition(chessPosition));
};

const fromGameState = (gameState: GameState): ChessGame => {
  const board = Chessboard.fromPosition(
    gameState.initialPosition,
    gameState.movesRecord
  );
  const result = gameState.result || evalResultFromBoard(board);
  return fromGameStateInternal({
    meta: { ...GameState.toMeta(gameState) },
    players: gameState.players,
    status: gameState.status,
    board,
    result,
    additionalActions: ChessGameActions.fromResult(result),
  });
};

export const ChessGame = {
  fromChessPosition,
  fromGameState,
};
