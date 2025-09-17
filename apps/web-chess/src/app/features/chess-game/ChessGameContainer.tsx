import { Color, Move } from '@michess/core-board';
import { GameState } from '@michess/core-game';
import {
  Chessboard as ChessboardView,
  GameStatusType,
} from '@michess/react-chessboard';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useApi } from '../../api/hooks/useApi';

const getGameStatus = (gameState: GameState): GameStatusType => {
  if (!gameState.result) {
    return 'active';
  } else if (gameState.result.type === 'draw') {
    return 'draw';
  } else if (
    gameState.result.type === 'white_win' ||
    gameState.result.type === 'black_win'
  ) {
    return 'checkmate';
  } else {
    return 'active';
  }
};

export const ChessGameContainer = ({
  gameId,
  orientation,
}: {
  gameId?: string;
  orientation?: Color;
}) => {
  const { games } = useApi();
  const { data } = useQuery({
    queryKey: ['game', gameId],
    queryFn: async () => {
      if (!gameId) return null;
      const gameDetails = await games.joinGame(gameId);
      return {
        moves: gameDetails.moves.map((m) => Move.fromUci(m.uci)),
      };
    },
    enabled: !!gameId,
  });
  const moveObservable = useMemo(() => {
    if (!gameId) return undefined;
    return games.observeMovesForGame(gameId);
  }, [gameId, games]);
  // const [chessboard, setChessboard] = useState(() =>
  //   Chessboard.fromPosition(
  //     FenParser.toChessPosition(
  //       'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  //     )
  //   )
  // );

  // TODO: Load game state from API using gameId
  // For now, we'll use the default position
  console.log('Loading game with ID:', gameId);

  return (
    <ChessboardView<Move>
      orientation={orientation}
      size={500}
      gameStatus={undefined}
      winner={undefined}
      moveHistory={data?.moves}
      moveObservable={moveObservable || undefined}
      onMove={async (move) => {
        console.log(move);
        if (!gameId) return true;
        try {
          await games.makeMove(gameId, Move.toUci(move));
          return true;
        } catch (error) {
          console.error('Error making move:', error);
          return false;
        }
      }}
    />
  );
};
