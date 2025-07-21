import {
  CastlingAbility,
  CastlingRight,
  Color,
  Coordinate,
  GameState,
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
  gameState: GameState,
  chessBitboards: ChessBitboard,
  moveMasks: MoveMaskBitboards
): MoveGeneratorContext => {
  const isTurn = (color: Color): boolean => gameState.turn === color;

  const piecePlacements = Object.entries(gameState.pieces).map(
    ([coord, piece]) => ({
      coord: coord as Coordinate,
      piece,
    })
  );
  return {
    piecePlacements,
    bitboards: chessBitboards,
    moveMasks,
    enPassantCoord: gameState.enPassant,
    turn: gameState.turn,
    opponentColor: isTurn(Color.White) ? Color.Black : Color.White,
    isTurn,
    castlingRights: CastlingAbility.toCastlingRights(gameState.turn, [
      ...gameState.castlingAbility,
    ]),
  };
};
export const MoveGeneratorContext = {
  from,
};
