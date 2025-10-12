import { Maybe } from '@michess/common-utils';
import { ChessPosition, Move } from '@michess/core-board';
import { GameAction } from '../actions/model/GameAction';
import { ChessGameResult } from './ChessGameResult';
import { GameMeta } from './GameMeta';
import { GamePlayers } from './GamePlayers';
import { GameStatusType } from './GameStatusType';

export type GameState = GameMeta & {
  players: GamePlayers;
  status: GameStatusType;
  result: Maybe<ChessGameResult>;
  resultStr: string;
  initialPosition: ChessPosition;
  actionRecord: GameAction[];
  movesRecord: Move[];
};

export const GameState = {
  toMeta: (gameState: GameState): GameMeta => ({
    id: gameState.id,
    variant: gameState.variant,
    isPrivate: gameState.isPrivate,
    startedAt: gameState.startedAt,
    endedAt: gameState.endedAt,
    createdAt: gameState.createdAt,
    updatedAt: gameState.updatedAt,
  }),
  fromChessPosition: (chessPosition: ChessPosition): GameState => ({
    initialPosition: chessPosition,
    id: '',
    variant: 'standard',
    isPrivate: false,
    startedAt: undefined,
    endedAt: undefined,
    createdAt: new Date(),
    updatedAt: new Date(),
    players: {
      white: undefined,
      black: undefined,
    },
    status: 'EMPTY',
    result: undefined,
    resultStr: '0-0',
    movesRecord: [],
    actionRecord: [],
  }),
};
