import { Coordinate } from '../common/Coordinate';
import { PieceType } from '../common/PieceType';

export type MoveRecord = {
  from: Coordinate;
  to: Coordinate;
  promotion?: PieceType;
};

export const MoveRecord = {
  isEqual: (a: MoveRecord, b: MoveRecord): boolean =>
    a.from === b.from && a.to === b.to && a.promotion === b.promotion,
  toString(move: MoveRecord): string {
    return move.promotion
      ? `${move.from}${move.to}${move.promotion[0]}`
      : `${move.from}${move.to}`;
  },
  fromUci(uci: string): MoveRecord {
    const from = uci.slice(0, 2) as Coordinate;
    const to = uci.slice(2, 4) as Coordinate;
    const promotion =
      uci.length === 5 ? (uci[4].toLowerCase() as PieceType) : undefined;

    return { from, to, promotion };
  },
};
