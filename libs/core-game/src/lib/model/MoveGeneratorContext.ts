import {
  CastlingAbility,
  CastlingRight,
  Color,
  Coordinate,
  ChessPosition,
  PiecePlacements,
  ChessBitboard,
} from '@michess/core-board';
import { MoveMaskBitboards } from './MoveMaskBitboards';

export type MoveGeneratorContext = {
  bitboards: ChessBitboard;
  turn: Color;
  isTurn(color: Color): boolean;
  opponentColor: Color;
  enPassantCoord?: Coordinate;
  castlingRights: CastlingRight[];
  piecePlacements: PiecePlacements;
  moveMasks: MoveMaskBitboards;
};

const from = (
  chessPosition: ChessPosition,
  chessBitboards: ChessBitboard,
  moveMasks: MoveMaskBitboards
): MoveGeneratorContext => {
  const isTurn = (color: Color): boolean => chessPosition.turn === color;

  return {
    piecePlacements: chessPosition.pieces,
    bitboards: chessBitboards,
    moveMasks,
    enPassantCoord: chessPosition.enPassant,
    turn: chessPosition.turn,
    opponentColor: isTurn(Color.White) ? Color.Black : Color.White,
    isTurn,
    castlingRights: CastlingAbility.toCastlingRights(
      chessPosition.turn,
      Array.from(chessPosition.castlingAbility.values())
    ),
  };
};
export const MoveGeneratorContext = {
  from,
};
