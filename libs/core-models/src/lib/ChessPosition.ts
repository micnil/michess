import { BoardState } from './BoardState';
import { CastlingAbility } from './CastlingAbility';
import { Color } from './Color';
import { Coordinate } from './Coordinate';
import { PiecePlacements } from './PiecePlacements';

export type ChessPosition = BoardState & {
  enPassant?: Coordinate;
  turn: Color;
  castlingAbility: Set<CastlingAbility>;
  ply: number;
  fullMoves: number;
};

export const ChessPosition = {
  standardInitial: (): ChessPosition => ({
    orientation: 'white',
    pieces: PiecePlacements.startingBoard,
    enPassant: undefined,
    turn: Color.White,
    castlingAbility: new Set(CastlingAbility.allValues),
    ply: 0,
    fullMoves: 1,
  }),
};
