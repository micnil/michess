import { BoardCoordinates, Coordinate } from '@michess/core-models';
import { Bitboard } from '@michess/core-state';
import { IndexBoardUtil } from '../util/IndexBoardUtil';

const KNIGHT_JUMP_OFFSETS = [15, 17, -17, -15, 10, -6, 6, -10];

export const KNIGHT_ATTACKS: Record<Coordinate, Bitboard> = Object.fromEntries(
  BoardCoordinates.createWhite().map((coord, index) => {
    const attacks = KNIGHT_JUMP_OFFSETS.map((offset) => index + offset)
      .filter(
        (targetIndex) =>
          IndexBoardUtil.withinBoard(targetIndex) &&
          IndexBoardUtil.chebyshevDistance(index, targetIndex) <= 2
      )
      .reduce((acc, targetIndex) => acc.setIndex(targetIndex), Bitboard());
    return [coord, attacks];
  })
) as Record<Coordinate, Bitboard>;

export const KnightAttacks = {
  fromCoord: (coord: Coordinate): Bitboard =>
    KNIGHT_ATTACKS[coord] ?? Bitboard(),
};
