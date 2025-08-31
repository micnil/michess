import { ChessPosition } from '@michess/core-models';
import { GameStateHistoryItem } from './GameStateHistoryItem';
import { Maybe } from '@michess/common-utils';
import { ChessGameActions } from '../ChessGameActions';
import { GameState } from './GameState';
import { ChessGameResult } from './ChessGameResult';
import { ZobristHash } from '../ZobristHash';

export type ChessGameInternalState = {
  positionHash: ZobristHash;
  additionalActions: ChessGameActions;
  gameHistory: GameStateHistoryItem[];
  initialPosition: ChessPosition;
  result: Maybe<ChessGameResult>;
} & ChessPosition;

const toGameState = (internalState: ChessGameInternalState): GameState => {
  return {
    ...internalState,
    moveHistory: internalState.gameHistory.map((item) => item.move),
    resultStr: ChessGameResult.toResultString(internalState.result),
  };
};

export const ChessGameInternalState = {
  toGameState,
};
