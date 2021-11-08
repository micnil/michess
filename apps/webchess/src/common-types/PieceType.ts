import { ColoredPieceType } from './ColoredPieceType';

export enum PieceType {
  Pawn = 'p',
  Rook = 'r',
  Knight = 'n',
  Bishop = 'b',
  Queen = 'q',
  King = 'k',
}

export const AllPieceTypeValues = Object.values(PieceType);

export const pieceFromColoredPiece = (
  coloredPiece: ColoredPieceType
): PieceType => {
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
};
