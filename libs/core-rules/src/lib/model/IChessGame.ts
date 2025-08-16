import { Move, GameState } from '@michess/core-models';
import { IChessboard } from '@michess/core-state';

export interface IChessGame extends IChessboard {
  getState(): GameState;
  getMoves(): Move[];
  makeMove(move: Move): IChessGame;
}
