import { Coordinate } from '@michess/core-board';

export type Square = {
  coordinate: Coordinate;
  position: { x: number; y: number };
  size: number;
  color: 'white' | 'black';
};
