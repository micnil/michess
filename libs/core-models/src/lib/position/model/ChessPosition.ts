import { Color } from '../../common/Color';
import { Coordinate } from '../../common/Coordinate';
import { CastlingAbility } from './CastlingAbility';
import { PiecePlacements } from './PiecePlacements';

export type ChessPosition = {
  enPassant?: Coordinate;
  turn: Color;
  castlingAbility: Set<CastlingAbility>;
  ply: number;
  fullMoves: number;
  pieces: PiecePlacements;
};

export const ChessPosition = {
  standardInitial: (): ChessPosition => ({
    pieces: PiecePlacements.startingBoard,
    enPassant: undefined,
    turn: Color.White,
    castlingAbility: new Set(CastlingAbility.allValues),
    ply: 0,
    fullMoves: 1,
  }),
};
