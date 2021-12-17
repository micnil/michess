import { ColoredPieceType } from './ColoredPieceType';

export enum Color {
  White = 'white',
  Black = 'black',
}

export const colorFromColoredPiece = (
  coloredPiece: ColoredPieceType
): Color => {
  if (coloredPiece.startsWith('w')) {
    return Color.White;
  } else if (coloredPiece.startsWith('b')) {
    return Color.Black;
  } else {
    throw new Error(`Unrecognized colored piece: ${coloredPiece}`);
  }
};
