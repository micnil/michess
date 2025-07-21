import { BoardCoordinates, Coordinate } from '@michess/core-models';
import { Bitboard } from '@michess/core-state';
import { IndexBoardUtil } from '../util/IndexBoardUtil';
import { DirectionOffset } from '../model/DirectionOffset';

type BitboardByDirection = Record<number, Bitboard>;
type DirectionalBitboardsByCoordinate = Record<Coordinate, BitboardByDirection>;

const SLIDER_ATTACKS: DirectionalBitboardsByCoordinate = Object.fromEntries(
  BoardCoordinates.createWhite().map((coord, index) => {
    const attacks: BitboardByDirection = {
      [DirectionOffset.N]: Bitboard().setIndices(
        IndexBoardUtil.unfoldDirection(index, DirectionOffset.N)
      ),
      [DirectionOffset.S]: Bitboard().setIndices(
        IndexBoardUtil.unfoldDirection(index, DirectionOffset.S)
      ),
      [DirectionOffset.E]: Bitboard().setIndices(
        IndexBoardUtil.unfoldDirection(index, DirectionOffset.E)
      ),
      [DirectionOffset.W]: Bitboard().setIndices(
        IndexBoardUtil.unfoldDirection(index, DirectionOffset.W)
      ),
      [DirectionOffset.NE]: Bitboard().setIndices(
        IndexBoardUtil.unfoldDirection(index, DirectionOffset.NE)
      ),
      [DirectionOffset.SE]: Bitboard().setIndices(
        IndexBoardUtil.unfoldDirection(index, DirectionOffset.SE)
      ),
      [DirectionOffset.NW]: Bitboard().setIndices(
        IndexBoardUtil.unfoldDirection(index, DirectionOffset.NW)
      ),
      [DirectionOffset.SW]: Bitboard().setIndices(
        IndexBoardUtil.unfoldDirection(index, DirectionOffset.SW)
      ),
    };
    return [coord, attacks];
  })
) as DirectionalBitboardsByCoordinate;

export const SliderAttacks = {
  fromCoordAndDirection: (coord: Coordinate, direction: DirectionOffset) =>
    SLIDER_ATTACKS[coord][direction],
};
