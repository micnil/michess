import { CastlingAbility } from '../CastlingAbility';
import { GameState } from '../GameState';
import { boardStateMock } from './BoardState.mock';

export const gameStateMock: GameState = {
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

export const createGameStateMock = (
  partialGameState?: Partial<GameState>
): GameState => ({
  ...gameStateMock,
  ...partialGameState,
});
