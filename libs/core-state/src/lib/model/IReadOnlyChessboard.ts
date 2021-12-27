import {
  BoardCoordinates,
  BoardState,
  Coordinate,
  PiecePlacement,
  SquareState,
} from '@michess/core-models';

export interface IReadOnlyChessboard {
  getIndex(coord: Coordinate): number;
  getSquare(coord: Coordinate): SquareState;
  getCoordinates(): BoardCoordinates;
  getState(): BoardState;
  getPiecePlacements(): PiecePlacement[]
}
