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

export const DirectionOffset = Object.freeze({
  ...DirectionOffsetEnum,
  allValues: Object.values(DirectionOffsetEnum),
  diagonals: DIAGONAL_OFFSETS,
  verticals: VERTICAL_OFFSETS,
  horizontals: HORIZONTAL_OFFSETS,
  adjacents: ADJECENT_OFFSETS,
  neighbors: NEIGHBORING_OFFSETS,
});

export type DirectionOffset = DirectionOffsetEnum;
