import { GameState } from '@michess/core-models';
import { IChessboard } from './IChessboard';

export interface IChessGame extends IChessboard {
  getState(): GameState;
}
