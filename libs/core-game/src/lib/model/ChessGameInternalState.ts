import { Maybe } from '@michess/common-utils';
import { ChessPosition } from '@michess/core-board';
import { ChessGameActions } from '../ChessGameActions';
import { MoveOption } from '../move/MoveOption';
import { ZobristHash } from '../ZobristHash';
import { ChessGameResult } from './ChessGameResult';
import { GameState } from './GameState';
import { GameStateHistoryItem } from './GameStateHistoryItem';

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
    moveHistory: internalState.gameHistory.map((item) =>
      MoveOption.toMove(item.move)
    ),
    resultStr: ChessGameResult.toResultString(internalState.result),
  };
};

export const ChessGameInternalState = {
  toGameState,
};
