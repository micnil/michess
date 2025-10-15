import { Bitboard } from '../../../bitboard/Bitboard';
import { BoardCoordinates } from '../../../BoardCoordinates';
import { Coordinate } from '../../../common/Coordinate';
import { DirectionOffset } from '../model/DirectionOffset';
import { IndexBoardUtil } from '../util/IndexBoardUtil';

type BitboardByDirection = Record<number, Bitboard>;
type DirectionalBitboardsByCoordinate = Record<Coordinate, BitboardByDirection>;

const SLIDER_ATTACKS: DirectionalBitboardsByCoordinate = Object.fromEntries(
  BoardCoordinates.createWhite().map((coord, index) => {
    const attacks: BitboardByDirection = {
      [DirectionOffset.N]: new Bitboard().setIndices(
        IndexBoardUtil.unfoldDirection(index, DirectionOffset.N),
      ),
      [DirectionOffset.S]: new Bitboard().setIndices(
        IndexBoardUtil.unfoldDirection(index, DirectionOffset.S),
      ),
      [DirectionOffset.E]: new Bitboard().setIndices(
        IndexBoardUtil.unfoldDirection(index, DirectionOffset.E),
      ),
      [DirectionOffset.W]: new Bitboard().setIndices(
        IndexBoardUtil.unfoldDirection(index, DirectionOffset.W),
      ),
      [DirectionOffset.NE]: new Bitboard().setIndices(
        IndexBoardUtil.unfoldDirection(index, DirectionOffset.NE),
      ),
      [DirectionOffset.SE]: new Bitboard().setIndices(
        IndexBoardUtil.unfoldDirection(index, DirectionOffset.SE),
      ),
      [DirectionOffset.NW]: new Bitboard().setIndices(
        IndexBoardUtil.unfoldDirection(index, DirectionOffset.NW),
      ),
      [DirectionOffset.SW]: new Bitboard().setIndices(
        IndexBoardUtil.unfoldDirection(index, DirectionOffset.SW),
      ),
    };
    return [coord, attacks];
  }),
) as DirectionalBitboardsByCoordinate;

export const SliderAttacks = {
  fromCoordAndDirection: (coord: Coordinate, direction: DirectionOffset) =>
    SLIDER_ATTACKS[coord][direction],
};
