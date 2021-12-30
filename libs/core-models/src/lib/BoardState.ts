import { PiecePlacements } from './PiecePlacements';
import { Color } from './Color';

export type BoardState = {
  pieces: PiecePlacements;
  orientation: Color;
};
