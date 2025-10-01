import { Bitboard } from '../../../bitboard/Bitboard';
import { BoardCoordinates } from '../../../BoardCoordinates';
import { Coordinate } from '../../../common/Coordinate';
import { DirectionOffset } from '../model/DirectionOffset';
import { IndexBoardUtil } from '../util/IndexBoardUtil';

const KING_ATTACKS: Record<Coordinate, Bitboard> = Object.fromEntries(
  BoardCoordinates.createWhite().map((coord, index) => {
    const attacks = DirectionOffset.neighbors.reduce(
      (attackBitboard, offset) => {
        const target = index + offset;
        return IndexBoardUtil.withinBoard(target) &&
          IndexBoardUtil.isNeighbors(index, target)
          ? attackBitboard.setIndex(target)
          : attackBitboard;
      },
      new Bitboard()
    );

    return [coord, attacks];
  })
) as Record<Coordinate, Bitboard>;

export const KingAttacks = {
  fromCoord: (coord: Coordinate): Bitboard =>
    KING_ATTACKS[coord] ?? new Bitboard(),
};
