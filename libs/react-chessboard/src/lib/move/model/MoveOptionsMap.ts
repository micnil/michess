import { Coordinate } from '@michess/core-board';
import { MoveOptions } from './MoveOptions';

export type MoveOptionsMap = Partial<Record<Coordinate, MoveOptions>>;

export const MoveOptionsMap = {
  fromMoveOptions: (moveOptions: MoveOptions): MoveOptionsMap => {
    return (
      moveOptions?.reduce((acc, curr) => {
        const currentList = acc[curr.from];
        return {
          ...acc,
          [curr.from]: currentList ? [...currentList, curr] : [curr],
        };
      }, {} as MoveOptionsMap) ?? {}
    );
  },
};
