import { Color } from './Color';
import {
  SQUARE_COORDINATES_BLACK,
  SQUARE_COORDINATES_WHITE,
} from './constants/board';

type WhiteSideCoordinates = typeof SQUARE_COORDINATES_WHITE;
type BlackSideCoordinates = typeof SQUARE_COORDINATES_BLACK;

export type BoardCoordinates = WhiteSideCoordinates | BlackSideCoordinates;

const fromOrientation = (orientation: Color): BoardCoordinates =>
  orientation === 'white' ? SQUARE_COORDINATES_WHITE : SQUARE_COORDINATES_BLACK;

export const BoardCoordinates = {
  createWhite: (): BoardCoordinates => fromOrientation('white'),
  fromOrientation,
};
