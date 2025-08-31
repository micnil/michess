import { Color } from './common/Color';
import { PiecePlacements } from './position/model/PiecePlacements';

export type BoardState = {
  pieces: PiecePlacements;
  orientation: Color;
};
