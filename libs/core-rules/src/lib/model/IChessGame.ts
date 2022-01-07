import { Color, GameState } from '@michess/core-models';
import { IChessboard } from '@michess/core-state';
import { Move } from './Move';

export interface IChessGame extends IChessboard {
  getState(): GameState;
  setOrientation(orientation: Color): IChessGame;
  getMoves(): Move[],
  makeMove(move: Move): IChessGame
}
