import { Maybe } from '@michess/common-utils';
import { Move } from '@michess/core-board';
import { Chessboard } from '@michess/core-game';
import { useEffect, useState } from 'react';
import { useApi } from '../api/hooks/useApi';

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
