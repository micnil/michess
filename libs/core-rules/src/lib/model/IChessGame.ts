import { Color, GameState } from '@michess/core-models';
import { IChessboard } from '@michess/core-state';

export interface IChessGame extends IChessboard {
  getState(): GameState;
  setOrientation(orientation: Color): IChessGame;
}
