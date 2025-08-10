import { Coordinate } from '@michess/core-models';

export type Square = {
  coordinate: Coordinate;
  position: { x: number; y: number };
  size: number;
  color: 'white' | 'black';
};
