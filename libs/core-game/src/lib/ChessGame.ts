import { isDefined, Maybe } from '@michess/common-utils';
import { ChessPosition, Color, Move } from '@michess/core-board';
import { Chessboard } from './Chessboard';
import { ChessGameActions } from './ChessGameActions';
import { ChessGameResult } from './model/ChessGameResult';
import { GameAction } from './model/GameAction';
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
  getAdditionalActions(): GameAction[];
  makeAction(playerId: string, action: GameAction): ChessGame;
  getPosition(): ChessPosition;
  play(playerId: string, move: Move): ChessGame;
  setResult(result: ChessGameResult): ChessGame;
  joinGame(playerInfo: PlayerInfo, side?: Color): ChessGame;
  leaveGame(playerId: string): ChessGame;
  isPlayerInGame(playerId: string): boolean;
};

const evalAdditionalActions = (
  previousActions: ChessGameActions,
  board: Chessboard
): ChessGameActions => {
  let additionalActions = previousActions;
  additionalActions = board.isThreeFoldRepetition
    ? additionalActions.addAction(GameAction.acceptDrawThreeFold())
    : additionalActions;
  additionalActions = board.isFiftyMoveRule
    ? additionalActions.addAction(GameAction.acceptDrawFiftyMoveRule())
    : additionalActions;
  additionalActions = board.isInsufficientMaterial
    ? additionalActions.addAction(GameAction.acceptDrawInsufficientMaterial())
    : additionalActions;
  return additionalActions;
};

const makeAction = (
  gameState: GameStateInternal,
  playerId: string,
  action: GameAction
): {
  gameState: GameStateInternal;
} => {
  const playerColor =
    gameState.players.white?.id === playerId
      ? Color.White
      : gameState.players.black?.id === playerId
      ? Color.Black
      : undefined;

  if (playerColor) {
    if (gameState.additionalActions.isActionAvailable(action, playerColor)) {
      const newActions = gameState.additionalActions.useAction(
        action,
        playerColor
      );
      switch (action.type) {
        case 'accept_draw':
        case 'resign':
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
        case 'offer_draw':
        case 'reject_draw':
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
  } else {
    throw new Error('Player is not part of the game');
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

  if (
    playerInfo.id === players.white?.id ||
    playerInfo.id === players.black?.id
  ) {
    // Player has already joined
    return players;
  } else if (sideToJoin === 'white' && players.white === undefined) {
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
  } else if (board.isStalemate || board.isInsufficientMaterial) {
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

  const getPlayerEntry = (playerId: string): Maybe<[Color, PlayerInfo]> => {
    return Object.entries(gameStateInternal.players).find(([_, player]) => {
      return player?.id === playerId;
    }) as Maybe<[Color, PlayerInfo]>;
  };
  const playMove = (playerId: string, move: Move): ChessGame => {
    if (result) {
      throw new Error('Game is already over');
    } else if (
      playerId !== gameStateInternal.players[board.position.turn]?.id
    ) {
      throw new Error('Not your turn');
    } else {
      const newBoard = board.playMove(move);
      const result = evalResultFromBoard(newBoard);
      return fromGameStateInternal({
        ...gameStateInternal,
        board: newBoard,
        status:
          gameStateInternal.status === 'READY'
            ? 'IN_PROGRESS'
            : result
            ? 'ENDED'
            : gameStateInternal.status,
        meta: {
          ...gameStateInternal.meta,
          startedAt: gameStateInternal.meta.startedAt ?? new Date(),
          endedAt:
            gameStateInternal.meta.endedAt ?? result ? new Date() : undefined,
        },
        result,
        additionalActions: evalAdditionalActions(additionalActions, newBoard),
      });
    }
  };
  return {
    getPosition: () => board.position,
    makeAction: (playerId: string, action: GameAction): ChessGame => {
      const { gameState } = makeAction(gameStateInternal, playerId, action);
      return fromGameStateInternal(gameState);
    },
    getState,
    play: playMove,
    setResult: (result: ChessGameResult): ChessGame => {
      return fromGameStateInternal({
        ...gameStateInternal,
        result,
        status: 'ENDED',
        additionalActions: ChessGameActions.fromResult(result),
      });
    },
    getAdditionalActions: () => gameStateInternal.additionalActions.value(),
    joinGame: (playerInfo: PlayerInfo, side?: Color): ChessGame => {
      const newPlayers = joinGame(gameStateInternal.players, playerInfo, side);
      const bothSidesTaken = !!newPlayers.black && !!newPlayers.white;

      return fromGameStateInternal({
        ...gameStateInternal,
        players: newPlayers,
        status: bothSidesTaken ? 'READY' : 'WAITING',
      });
    },
    isPlayerInGame: (playerId: string): boolean => {
      return getPlayerEntry(playerId) !== undefined;
    },
    leaveGame: (playerId: string): ChessGame => {
      const playerEntry = getPlayerEntry(playerId);
      const allowedToLeave: GameStatusType[] = ['WAITING', 'READY'];
      if (playerEntry && allowedToLeave.includes(gameStateInternal.status)) {
        gameStateInternal.players[playerEntry[0] as Color] = undefined;
        return fromGameStateInternal({
          ...gameStateInternal,
          status:
            gameStateInternal.status === 'READY'
              ? 'WAITING'
              : gameStateInternal.status === 'WAITING'
              ? 'EMPTY'
              : gameStateInternal.status,
        });
      } else {
        return fromGameStateInternal(gameStateInternal);
      }
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
