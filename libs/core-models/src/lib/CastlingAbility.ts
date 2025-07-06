import { CastlingRights } from './CastlingRights';
import { Color } from './Color';

const CastlingAbilityEnum = {
  BlackQueen: 'BlackQueen',
  BlackKing: 'BlackKing',
  WhiteQueen: 'WhiteQueen',
  WhiteKing: 'WhiteKing',
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
const toCastingRights = (ability: CastlingAbility): CastlingRights => {
  switch (ability) {
    case CastlingAbilityEnum.WhiteKing:
      return CastlingRights.KingSide;
    case CastlingAbilityEnum.WhiteQueen:
      return CastlingRights.QueenSide;
    case CastlingAbilityEnum.BlackKing:
      return CastlingRights.KingSide;
    case CastlingAbilityEnum.BlackQueen:
      return CastlingRights.QueenSide;
    default:
      throw new Error(`Unknown castling ability: ${ability}`);
  }
};

export const CastlingAbility = Object.freeze({
  ...CastlingAbilityEnum,
  allValues: Object.values(CastlingAbilityEnum),
  toCastlingRights: (color: Color, abilities: CastlingAbility[]) => {
    const relevantAbilitys = abilities.filter(
      (ability) =>
        (color === Color.White && WHITE_CASTLING_ABILITIES.includes(ability)) ||
        (color === Color.Black && BLACK_CASTLING_ABILITIES.includes(ability))
    );
    return relevantAbilitys.map(toCastingRights);
  },
});
