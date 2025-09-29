import { Maybe } from '@michess/common-utils';
import { ChessPosition, Move } from '@michess/core-board';
import { Chessboard } from '@michess/core-game';
import { MovePayload } from '@michess/react-chessboard';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useApi } from '../../../api/hooks/useApi';
import { useAuth } from '../../../api/hooks/useAuth';
import { ParticipantGameViewModel } from '../../../api/model/ParticipantGameViewModel';
import { useObservable } from '../../../util/useObservable';
import { useQuery } from '../../../util/useQuery';
import { useUnmount } from '../../../util/useUnmount';

type Props = {
  gameId: string;
};

type RemoteChessGame = {
  isLoadingInitial: boolean;
  chessboard: Chessboard;
  handleMove: (move: MovePayload) => void;
  error: Maybe<Error>;
  gameState: ParticipantGameViewModel;
};

const participantGameViewModelSelector = (
  data: ParticipantGameViewModel
): {
  chessboard: Chessboard;
  gameState: ParticipantGameViewModel;
} => ({
  chessboard: Chessboard.fromPosition(
    ChessPosition.standardInitial(),
    data.moves
  ),
  gameState: data,
});

const placeholderData: ParticipantGameViewModel = {
  status: 'WAITING',
  players: { white: undefined, black: undefined },
  playerSide: 'spectator' as const,
  result: undefined,
  startedAt: undefined,
  isReadOnly: true,
  moves: [],
};

export const useRemoteGame = (props: Props): RemoteChessGame => {
  const { games } = useApi();
  const { auth } = useAuth();
  const [chessboard, setChessboard] = useState<Chessboard>(
    Chessboard.fromPosition(ChessPosition.standardInitial())
  );
  const queryClient = useQueryClient();

  const {
    data: remoteData,
    isPending,
    error,
  } = useQuery({
    queryKey: ['game', props.gameId],
    queryFn: async () => games.joinGame(props.gameId),
    select: participantGameViewModelSelector,
    gcTime: Infinity,
    staleTime: Infinity,
    refetchOnMount: 'always',
    placeholderData,
  });
  const remoteChessboard = remoteData?.chessboard;
  useEffect(() => {
    if (remoteChessboard) {
      setChessboard((previousBoard) =>
        remoteChessboard.positionHash !== previousBoard.positionHash
          ? remoteChessboard
          : previousBoard
      );
    }
  }, [remoteChessboard]);

  const { mutateAsync: makeMoveRemote } = useMutation({
    mutationFn: (move: MovePayload) =>
      games.makeMove(props.gameId, Move.toUci(move)),
  });

  const gameObservable = useMemo(
    () => games.observeGameState(props.gameId, auth?.session.userId),
    [games, props.gameId, auth?.session.userId]
  );
  useObservable(gameObservable, (gameState) => {
    queryClient.setQueryData<ParticipantGameViewModel>(
      ['game', props.gameId],
      () => {
        return gameState;
      }
    );
  });
  const movesObservable = useMemo(
    () => games.observeMovesForGame(props.gameId),
    [games, props.gameId]
  );
  useObservable(movesObservable, (move) => {
    setChessboard((prev) => prev.playMove(move));
  });

  useUnmount(() => {
    games.leaveGame(props.gameId);
  });

  const handleMove = (move: MovePayload) => {
    // Optimistic update
    setChessboard((prev) => prev.playMove(move));
    makeMoveRemote(move).catch(() => {
      // Revert on error
      setChessboard((prev) => prev.unmakeMove());
    });
  };
  return {
    chessboard: chessboard,
    handleMove,
    error: error ?? undefined,
    isLoadingInitial: isPending,
    gameState: remoteData?.gameState || placeholderData,
  };
};
