import {
  BoardCoordinates,
  BoardState,
  Coordinate,
  SquareState,
} from '@michess/core-models';

export interface IReadOnlyChessboard {
  getIndex(coord: Coordinate): number;
  getSquare(coord: Coordinate): SquareState;
  getCoordinates(): BoardCoordinates;
  getState(): BoardState;
}
