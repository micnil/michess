import { CastlingAbility } from '../CastlingAbility';
import { ChessPosition } from '../ChessPosition';
import { boardStateMock } from './BoardState.mock';

export const chessPositionMock: ChessPosition = {
  ...boardStateMock,
  castlingAbility: new Set([
    CastlingAbility.BlackKing,
    CastlingAbility.BlackQueen,
    CastlingAbility.WhiteKing,
    CastlingAbility.WhiteQueen,
  ]),
  turn: 'white',
  fullMoves: 1,
  ply: 0,
};

export const createChessPositionMock = (
  partialChessPosition?: Partial<ChessPosition>
): ChessPosition => ({
  ...chessPositionMock,
  ...partialChessPosition,
});
