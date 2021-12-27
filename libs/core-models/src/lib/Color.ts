import { ColoredPieceType } from './ColoredPieceType';

export type Color = 'white' | 'black'

export const Color = {
  colorFromColoredPiece: (
    coloredPiece: ColoredPieceType
  ): Color => {
    if (coloredPiece.startsWith('w')) {
      return 'white';
    } else if (coloredPiece.startsWith('b')) {
      return 'black';
    } else {
      throw new Error(`Unrecognized colored piece: ${coloredPiece}`);
    }
  }
}
