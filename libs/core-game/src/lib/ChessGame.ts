import { isDefined, Maybe } from '@michess/common-utils';
import { ChessPosition, Color, Move } from '@michess/core-board';
import { ChessGameActions } from './actions/ChessGameActions';
import { GameActionIn } from './actions/model/GameActionIn';
import { GameActionOption } from './actions/model/GameActionOption';
import { Chessboard } from './Chessboard';
import { ChessClock } from './ChessClock';
import { ChessGameError } from './model/ChessGameError';
import { ChessGameResult } from './model/ChessGameResult';
import { GameMeta } from './model/GameMeta';
import { GamePlayers } from './model/GamePlayers';
import { GameState } from './model/GameState';
import { GameStatusType } from './model/GameStatusType';
import { PlayerInfo } from './model/PlayerInfo';
import { TimeControl } from './model/TimeControl';

type GameStateInternal = {
  timeControl: TimeControl;
  clock: Maybe<ChessClock>;
  meta: GameMeta;
  players: GamePlayers;
  status: GameStatusType;
  additionalActions: ChessGameActions;
  result: Maybe<ChessGameResult>;
  board: Chessboard;
};

export type ChessGame = {
  getState(): GameState;
  getAdditionalActions(): GameActionOption[];
  makeAction(playerId: string, action: GameActionIn): ChessGame;
  getPosition(): ChessPosition;
  play(playerId: string, move: Move): ChessGame;
  setResult(result: ChessGameResult): ChessGame;
  joinGame(playerInfo: PlayerInfo, side?: Color): ChessGame;
  leaveGame(playerId: string): ChessGame;
  isPlayerInGame(playerId: string): boolean;
  hasNewStatus(oldChess: ChessGame): boolean;
  hasNewActionOptions(oldChess: ChessGame): boolean;
  clock: ChessClock;
};

const makeAction = (
  gameState: GameStateInternal,
  playerId: string,
  action: GameActionOption,
): {
  gameState: GameStateInternal;
} => {
  if (gameState.result) {
    throw new ChessGameError('game_is_over', 'Game is already over');
  }

  const result = evalResult(gameState.board, gameState.clock);
  if (result) {
    const endedAt = new Date();
    return {
      gameState: {
        ...gameState,
        status: 'ENDED',
        meta: {
          ...gameState.meta,
          endedAt,
        },
        result: gameState.result ?? result,
        clock: gameState.clock?.pause(endedAt.getTime()),
      },
    };
  }
  const playerColor =
    gameState.players.white?.id === playerId
      ? Color.White
      : gameState.players.black?.id === playerId
        ? Color.Black
        : undefined;

  if (playerColor) {
    if (gameState.additionalActions.isActionAvailable(playerColor, action)) {
      const newActions = gameState.additionalActions.useAction(
        playerColor,
        action,
      );
      switch (action.type) {
        case 'accept_draw':
        case 'resign': {
          const endedAt = gameState.meta.endedAt ?? new Date();
          return {
            gameState: {
              ...gameState,
              status: 'ENDED',
              meta: {
                ...gameState.meta,
                endedAt,
              },
              result: ChessGameResult.fromChessGameAction(
                action,
                gameState.board.position.turn,
              ),
              clock: gameState.clock?.pause(endedAt.getTime()),
              additionalActions: newActions,
            },
          };
        }
        case 'offer_draw':
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
        `Action ${action.type} is not available for turn ${gameState.board.position.turn}`,
      );
    }
  } else {
    throw new Error('Player is not part of the game');
  }
};

const joinGame = (
  players: GamePlayers,
  playerInfo: PlayerInfo,
  color?: Color,
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
      white: playerInfo,
    };
  } else if (sideToJoin === 'black' && players.black === undefined) {
    return {
      ...players,
      black: playerInfo,
    };
  } else {
    throw new Error('Invalid side or side already taken');
  }
};

const evalResult = (
  board: Chessboard,
  clock: Maybe<ChessClock>,
): ChessGameResult | undefined => {
  const flagResult = clock ? ChessGameResult.toFlag(clock.instant) : false;
  if (board.isCheckmate) {
    return ChessGameResult.toCheckmate(
      board.position.turn === Color.White ? Color.Black : Color.White,
    );
  } else if (board.isStalemate || board.isInsufficientMaterial) {
    return { type: 'draw' };
  } else if (flagResult) {
    return flagResult;
  } else {
    return undefined;
  }
};

const fromGameStateInternal = (
  gameStateInternal: GameStateInternal,
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
      timeControl: gameStateInternal.timeControl,
      actionRecord: gameStateInternal.additionalActions.usedActions,
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
      throw new ChessGameError('game_is_over', 'Game is already over');
    } else if (
      playerId !== gameStateInternal.players[board.position.turn]?.id
    ) {
      throw new ChessGameError('not_your_turn', 'Not your turn');
    } else {
      const timestamp = Date.now();
      const newClock = gameStateInternal.clock?.hit(
        board.position.turn,
        timestamp,
      );

      if (newClock?.lastEvent.type === 'flag') {
        throw new ChessGameError('not_your_turn', 'Not your turn');
      }

      const newBoard = board.playMove({ ...move, timestamp });
      const result = evalResult(newBoard, newClock);

      const newStatus =
        gameStateInternal.status === 'READY'
          ? 'IN_PROGRESS'
          : result
            ? 'ENDED'
            : gameStateInternal.status;
      return fromGameStateInternal({
        ...gameStateInternal,
        board: newBoard,
        status: newStatus,
        clock: newClock,
        meta: {
          ...gameStateInternal.meta,
          startedAt: gameStateInternal.meta.startedAt ?? new Date(),
          endedAt:
            (gameStateInternal.meta.endedAt ?? result) ? new Date() : undefined,
        },
        result,
        additionalActions: additionalActions.updateBoard(newStatus, newBoard),
      });
    }
  };
  return {
    get clock(): ChessClock {
      return this.clock;
    },
    getPosition: () => board.position,
    makeAction: (playerId: string, action: GameActionOption): ChessGame => {
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
        additionalActions: gameStateInternal.additionalActions.updateBoard(
          'ENDED',
          board,
        ),
      });
    },
    getAdditionalActions: () => gameStateInternal.additionalActions.value(),
    joinGame: (playerInfo: PlayerInfo, side?: Color): ChessGame => {
      if (
        gameStateInternal.status === 'WAITING' ||
        gameStateInternal.status === 'EMPTY'
      ) {
        const newPlayers = joinGame(
          gameStateInternal.players,
          playerInfo,
          side,
        );
        const bothSidesTaken = !!newPlayers.black && !!newPlayers.white;

        return fromGameStateInternal({
          ...gameStateInternal,
          players: newPlayers,
          status: bothSidesTaken ? 'READY' : 'WAITING',
        });
      } else {
        return fromGameStateInternal(gameStateInternal);
      }
    },
    isPlayerInGame: (playerId: string): boolean => {
      return getPlayerEntry(playerId) !== undefined;
    },
    hasNewActionOptions: (oldChess: ChessGame): boolean => {
      return !gameStateInternal.additionalActions.hasExactOptions(
        oldChess.getAdditionalActions(),
      );
    },
    hasNewStatus: (oldChess: ChessGame): boolean => {
      return oldChess.getState().status !== gameStateInternal.status;
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
    gameState.movesRecord,
  );
  const clock = ChessClock.fromGameState(gameState);
  const result = gameState.result || evalResult(board, clock);
  return fromGameStateInternal({
    meta: { ...GameState.toMeta(gameState) },
    players: gameState.players,
    status: gameState.status,
    board,
    result,
    timeControl: gameState.timeControl,
    clock: clock,
    additionalActions: ChessGameActions.from(
      gameState.actionRecord,
      board,
      gameState.status,
    ),
  });
};

export const ChessGame = {
  fromChessPosition,
  fromGameState,
};
