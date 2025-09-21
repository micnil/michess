import { MovePayload } from '../model/MovePayload';

/**
 * Convert a move to algebraic notation for display in score sheet
 * This is a simplified implementation that converts coordinate moves to basic algebraic notation
 * Note: This does not handle disambiguation (e.g., Nbd2 vs Nfd2) or check/checkmate symbols
 */
export const moveToAlgebraicNotation = <TMoveMeta = unknown>(
  move: MovePayload<TMoveMeta>
): string => {
  const { from, to, promotion } = move;

  // Handle castling moves based on king movement
  if (from === 'e1' && to === 'g1') return 'O-O'; // White kingside
  if (from === 'e1' && to === 'c1') return 'O-O-O'; // White queenside
  if (from === 'e8' && to === 'g8') return 'O-O'; // Black kingside
  if (from === 'e8' && to === 'c8') return 'O-O-O'; // Black queenside

  // For now, return simple coordinate notation (this will be improved)
  // In a full implementation, we would need board state to determine piece types
  const moveStr = `${from}${to}`;

  if (promotion) {
    const promotionChar = promotion.toUpperCase();
    return `${moveStr}=${promotionChar}`;
  }

  return moveStr;
};

/**
 * Format moves into numbered pairs for display
 * @param moves Array of moves in chronological order
 * @returns Array of formatted move pairs like ["1. e4 e5", "2. Nf3 Nc6"]
 */
export const formatMovesIntoPairs = <TMoveMeta = unknown>(
  moves: MovePayload<TMoveMeta>[]
): string[] => {
  const pairs: string[] = [];

  for (let i = 0; i < moves.length; i += 2) {
    const moveNumber = Math.floor(i / 2) + 1;
    const whiteMove = moveToAlgebraicNotation(moves[i]);
    const blackMove =
      i + 1 < moves.length ? moveToAlgebraicNotation(moves[i + 1]) : '';

    if (blackMove) {
      pairs.push(`${moveNumber}. ${whiteMove} ${blackMove}`);
    } else {
      pairs.push(`${moveNumber}. ${whiteMove}`);
    }
  }

  return pairs;
};

/**
 * Format moves for mobile horizontal display with move numbers as separators
 * @param moves Array of moves in chronological order
 * @returns Array alternating between move numbers and individual moves
 */
export const formatMovesForMobile = <TMoveMeta = unknown>(
  moves: MovePayload<TMoveMeta>[]
): Array<{
  type: 'separator' | 'move';
  content: string;
  isWhite?: boolean;
}> => {
  const result: Array<{
    type: 'separator' | 'move';
    content: string;
    isWhite?: boolean;
  }> = [];

  for (let i = 0; i < moves.length; i++) {
    const moveNumber = Math.floor(i / 2) + 1;
    const isWhiteMove = i % 2 === 0;
    const notation = moveToAlgebraicNotation(moves[i]);

    // Add move number separator before white moves
    if (isWhiteMove) {
      result.push({ type: 'separator', content: `${moveNumber}.` });
    }

    // Add the move
    result.push({
      type: 'move',
      content: notation,
      isWhite: isWhiteMove,
    });
  }

  return result;
};
