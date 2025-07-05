import { ColoredPieceType } from './ColoredPieceType';

const PieceTypeEnum = {
  Pawn: 'p',
  Rook: 'r',
  Knight: 'n',
  Bishop: 'b',
  Queen: 'q',
  King: 'k',
} as const;

export type PieceType = typeof PieceTypeEnum[keyof typeof PieceTypeEnum];

export const PieceType = Object.freeze({
  ...PieceTypeEnum,
  allValues: Object.values(PieceTypeEnum),
  promotionValues: [
    PieceTypeEnum.Queen,
    PieceTypeEnum.Rook,
    PieceTypeEnum.Bishop,
    PieceTypeEnum.Knight,
  ],
  fromColoredPiece: (coloredPiece: ColoredPieceType): PieceType => {
    const pieceLetter = coloredPiece[coloredPiece.length - 1];
    switch (pieceLetter) {
      case 'p':
        return PieceType.Pawn;
      case 'r':
        return PieceType.Rook;
      case 'n':
        return PieceType.Knight;
      case 'b':
        return PieceType.Bishop;
      case 'q':
        return PieceType.Queen;
      case 'k':
        return PieceType.King;
      default:
        throw new Error(`Unrecognized colored piece: ${coloredPiece}`);
    }
  },
});
