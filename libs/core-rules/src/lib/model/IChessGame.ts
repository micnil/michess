import { GameResult, ChessPosition, Move } from '@michess/core-models';
import { IChessboard } from '@michess/core-state';

export interface IChessGame extends IChessboard {
  getState(): ChessPosition & GameResult;
  getMoves(): Move[];
  makeMove(move: Move): IChessGame;
}
