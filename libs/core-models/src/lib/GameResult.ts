import { Color } from './Color';

export type GameResult = {
  isGameOver: boolean;
  winner?: Color | 'draw';
};
