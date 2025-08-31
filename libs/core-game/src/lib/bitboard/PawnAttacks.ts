import { BoardCoordinates, Color, Coordinate } from '@michess/core-models';
import { Bitboard } from '@michess/core-state';
import { IndexBoardUtil } from '../util/IndexBoardUtil';

type PawnAttacksType = Record<Coordinate, Record<Color, Bitboard>>;
const PAWN_ATTACKS: PawnAttacksType = Object.fromEntries(
  BoardCoordinates.createWhite().map((coord, index) => {
    const whiteAttacks = [index - 7, index - 9].filter(
      (targetIndex) =>
        IndexBoardUtil.withinBoard(targetIndex) &&
        IndexBoardUtil.isNeighbors(index, targetIndex)
    );
    const blackAttacks = [index + 7, index + 9].filter(
      (targetIndex) =>
        IndexBoardUtil.withinBoard(targetIndex) &&
        IndexBoardUtil.isNeighbors(index, targetIndex)
    );
    const attacks: Record<Color, Bitboard> = {
      white: new Bitboard().setIndices(whiteAttacks),
      black: new Bitboard().setIndices(blackAttacks),
    };
    return [coord, attacks];
  })
) as PawnAttacksType;

export const PawnAttacks = {
  fromCoordAndColor: (coord: Coordinate, color: Color): Bitboard =>
    PAWN_ATTACKS[coord]?.[color] ?? new Bitboard(),
};
