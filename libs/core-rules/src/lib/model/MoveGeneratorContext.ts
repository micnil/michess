import {
  CastlingAbility,
  CastlingRight,
  Color,
  Coordinate,
  ChessPosition,
  PiecePlacement,
} from '@michess/core-models';
import { ChessBitboard } from '@michess/core-state';
import { MoveMaskBitboards } from './MoveMaskBitboards';

export type MoveGeneratorContext = {
  bitboards: ChessBitboard;
  turn: Color;
  isTurn(color: Color): boolean;
  opponentColor: Color;
  enPassantCoord?: Coordinate;
  castlingRights: CastlingRight[];
  piecePlacements: PiecePlacement[];
  moveMasks: MoveMaskBitboards;
};

const from = (
  chessPosition: ChessPosition,
  chessBitboards: ChessBitboard,
  moveMasks: MoveMaskBitboards
): MoveGeneratorContext => {
  const isTurn = (color: Color): boolean => chessPosition.turn === color;

  const piecePlacements = Object.entries(chessPosition.pieces).map(
    ([coord, piece]) => ({
      coord: coord as Coordinate,
      piece,
    })
  );
  return {
    piecePlacements,
    bitboards: chessBitboards,
    moveMasks,
    enPassantCoord: chessPosition.enPassant,
    turn: chessPosition.turn,
    opponentColor: isTurn(Color.White) ? Color.Black : Color.White,
    isTurn,
    castlingRights: CastlingAbility.toCastlingRights(chessPosition.turn, [
      ...chessPosition.castlingAbility,
    ]),
  };
};
export const MoveGeneratorContext = {
  from,
};
