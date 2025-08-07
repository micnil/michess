import { GameResult, GameState } from '@michess/core-models';
import { IChessboard } from '@michess/core-state';
import { Move } from './Move';

export interface IChessGame extends IChessboard {
  getState(): GameState & GameResult;
  getMoves(): Move[];
  makeMove(move: Move): IChessGame;
}
