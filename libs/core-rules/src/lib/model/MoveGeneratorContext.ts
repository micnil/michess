import {
  CastlingAbility,
  CastlingRight,
  Color,
  Coordinate,
  GameState,
} from '@michess/core-models';
import { ChessBitboard, Chessboard, IChessboard } from '@michess/core-state';

export type MoveGeneratorContext = {
  board: IChessboard;
  bitboards: ChessBitboard;
  turn: Color;
  isTurn(color: Color): boolean;
  opponentColor: Color;
  enPassantCoord?: Coordinate;
  castlingRights: CastlingRight[];
};

const from = (gameState: GameState): MoveGeneratorContext => {
  const chessbitboards = ChessBitboard(gameState.pieces);
  const board = Chessboard(gameState);
  const isTurn = (color: Color): boolean => gameState.turn === color;
  return {
    board,
    bitboards: chessbitboards,
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
