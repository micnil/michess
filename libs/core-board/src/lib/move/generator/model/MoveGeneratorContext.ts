import { ChessBitboard } from '../../../bitboard/ChessBitboard';
import { Color } from '../../../common/Color';
import { Coordinate } from '../../../common/Coordinate';
import { CastlingAbility } from '../../../position/model/CastlingAbility';
import { CastlingRight } from '../../../position/model/CastlingRight';
import { ChessPosition } from '../../../position/model/ChessPosition';
import { PiecePlacements } from '../../../position/model/PiecePlacements';
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
