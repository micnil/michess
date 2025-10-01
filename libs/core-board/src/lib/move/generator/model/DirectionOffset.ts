enum DirectionOffsetEnum {
  N = -8,
  S = +8,
  E = +1,
  W = -1,
  NE = -7,
  SE = +9,
  NW = -9,
  SW = +7,
}

const DIAGONAL_OFFSETS = [
  DirectionOffsetEnum.NE,
  DirectionOffsetEnum.NW,
  DirectionOffsetEnum.SE,
  DirectionOffsetEnum.SW,
];
const VERTICAL_OFFSETS = [DirectionOffsetEnum.N, DirectionOffsetEnum.S];
const HORIZONTAL_OFFSETS = [DirectionOffsetEnum.E, DirectionOffsetEnum.W];
const ADJECENT_OFFSETS = [...VERTICAL_OFFSETS, ...HORIZONTAL_OFFSETS];
const NEIGHBORING_OFFSETS = [...ADJECENT_OFFSETS, ...DIAGONAL_OFFSETS];

export type DirectionOffset = DirectionOffsetEnum;

export const DirectionOffset = Object.freeze({
  ...DirectionOffsetEnum,
  allValues: Object.values(DirectionOffsetEnum),
  diagonals: DIAGONAL_OFFSETS,
  verticals: VERTICAL_OFFSETS,
  horizontals: HORIZONTAL_OFFSETS,
  adjacents: ADJECENT_OFFSETS,
  neighbors: NEIGHBORING_OFFSETS,
  fromCoordinates: (coord1: number, coord2: number): DirectionOffsetEnum => {
    const deltaX = (coord2 % 8) - (coord1 % 8);
    const deltaY = Math.floor(coord2 / 8) - Math.floor(coord1 / 8);
    if (deltaX === 0 && deltaY === 0) return 0 as DirectionOffsetEnum;
    if (deltaX === 0)
      return deltaY > 0 ? DirectionOffsetEnum.S : DirectionOffsetEnum.N;
    if (deltaY === 0)
      return deltaX > 0 ? DirectionOffsetEnum.E : DirectionOffsetEnum.W;
    if (Math.abs(deltaX) === Math.abs(deltaY)) {
      if (deltaY > 0)
        return deltaX > 0 ? DirectionOffsetEnum.SE : DirectionOffsetEnum.SW;
      else return deltaX > 0 ? DirectionOffsetEnum.NE : DirectionOffsetEnum.NW;
    }
    return 0 as DirectionOffsetEnum;
  },
});
