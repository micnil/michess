import { CastlingRight } from './CastlingRight';
import { Color } from './Color';

const CastlingAbilityEnum = {
  WhiteKing: 'WhiteKing',
  WhiteQueen: 'WhiteQueen',
  BlackKing: 'BlackKing',
  BlackQueen: 'BlackQueen',
} as const;

export type CastlingAbility =
  typeof CastlingAbilityEnum[keyof typeof CastlingAbilityEnum];

const WHITE_CASTLING_ABILITIES: CastlingAbility[] = [
  CastlingAbilityEnum.WhiteKing,
  CastlingAbilityEnum.WhiteQueen,
];
const BLACK_CASTLING_ABILITIES: CastlingAbility[] = [
  CastlingAbilityEnum.BlackKing,
  CastlingAbilityEnum.BlackQueen,
];
const toCastingRights = (ability: CastlingAbility): CastlingRight => {
  switch (ability) {
    case CastlingAbilityEnum.WhiteKing:
      return CastlingRight.KingSide;
    case CastlingAbilityEnum.WhiteQueen:
      return CastlingRight.QueenSide;
    case CastlingAbilityEnum.BlackKing:
      return CastlingRight.KingSide;
    case CastlingAbilityEnum.BlackQueen:
      return CastlingRight.QueenSide;
    default:
      throw new Error(`Unknown castling ability: ${ability}`);
  }
};

export const CastlingAbility = Object.freeze({
  ...CastlingAbilityEnum,
  allValues: Object.values(CastlingAbilityEnum),
  whiteValues: WHITE_CASTLING_ABILITIES,
  blackValues: BLACK_CASTLING_ABILITIES,
  toCastlingRights: (color: Color, abilities: CastlingAbility[]) => {
    const relevantAbilitys = abilities.filter(
      (ability) =>
        (color === Color.White && WHITE_CASTLING_ABILITIES.includes(ability)) ||
        (color === Color.Black && BLACK_CASTLING_ABILITIES.includes(ability))
    );
    return relevantAbilitys.map(toCastingRights);
  },
});
