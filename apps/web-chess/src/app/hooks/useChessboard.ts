import { Maybe } from '@michess/common-utils';
import { Move } from '@michess/core-board';
import { Chessboard } from '@michess/core-game';
import { useEffect, useState } from 'react';
import { useApi } from '../api/hooks/useApi';

/**
 * React hook that manages a Chessboard and observes moves for a game
 * @param gameId The game ID to observe moves for
 * @param initialChessboard Initial chessboard state
 * @returns The current chessboard state
 */
export const useChessboard = (
  gameId: Maybe<string>,
  initialChessboard: Chessboard
): Chessboard => {
  const [chessboard, setChessboard] = useState<Chessboard>(initialChessboard);
  const { games } = useApi();

  useEffect(() => {
    if (!gameId) {
      return;
    }

    return games.observeMovesForGame(gameId).subscribe((move: Move) => {
      setChessboard((currentBoard) => currentBoard.playMove(move));
    });
  }, [gameId, games]);

  return chessboard;
};
