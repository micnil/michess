export const MoveMapper = {
  toUci(move: { from: string; to: string; promotion?: string }): string {
    return move.promotion
      ? `${move.from}${move.to}${move.promotion[0]}`
      : `${move.from}${move.to}`;
  },
  fromUci(uci: string): { from: string; to: string; promotion?: string } {
    const from = uci.slice(0, 2);
    const to = uci.slice(2, 4);
    const promotionChar = uci.length === 5 ? uci[4] : undefined;
    const promotionMap: Record<string, string> = {
      q: 'queen',
      r: 'rook',
      b: 'bishop',
      n: 'knight',
    };
    const promotion = promotionChar ? promotionMap[promotionChar] : undefined;
    return promotion ? { from, to, promotion } : { from, to };
  },
};
