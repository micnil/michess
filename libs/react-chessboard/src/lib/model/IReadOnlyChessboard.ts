import {
  BoardCoordinates,
  BoardState,
  Coordinate,
  PiecePlacement,
} from '@michess/core-models';

export interface IReadOnlyChessboard {
  getIndex(coord: Coordinate): number;
  getCoordinates(): BoardCoordinates;
  getState(): BoardState;
  getPiecePlacements(): PiecePlacement[];
}
