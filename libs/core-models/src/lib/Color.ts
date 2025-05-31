import { ColoredPieceType } from './ColoredPieceType';

const ColorEnum = {
  White: 'white',
  Black: 'black',
} as const;

export type Color = typeof ColorEnum[keyof typeof ColorEnum];

export const Color = Object.freeze({
  ...ColorEnum,
  fromColoredPiece: (coloredPiece: ColoredPieceType): Color => {
    if (coloredPiece.startsWith('w')) {
      return 'white';
    } else if (coloredPiece.startsWith('b')) {
      return 'black';
    } else {
      throw new Error(`Unrecognized colored piece: ${coloredPiece}`);
    }
  },
});
