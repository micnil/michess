import { Maybe } from '@michess/common-utils';
import { Chessboard } from '../Chessboard';
import { ChessGameActions } from '../ChessGameActions';
import { ChessGameResult } from './ChessGameResult';
import { GameState } from './GameState';

export type ChessGameInternalState = {
  additionalActions: ChessGameActions;
  result: Maybe<ChessGameResult>;
  board: Chessboard;
};

const toGameState = (internalState: ChessGameInternalState): GameState => {
  return {
    initialPosition: internalState.board.initialPosition,
    result: internalState.result,
    moveHistory: internalState.board.moveRecord,
    resultStr: ChessGameResult.toResultString(internalState.result),
  };
};

export const ChessGameInternalState = {
  toGameState,
};
