import { GameActionOptionV1 } from '@michess/api-schema';
import { Maybe } from '@michess/common-utils';
import { ChessPosition, Move } from '@michess/core-board';
import { Chessboard } from '@michess/core-game';
import { MovePayload } from '@michess/react-chessboard';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { create } from 'zustand';
import { useApi } from '../../../api/hooks/useApi';
import { useAuth } from '../../../api/hooks/useAuth';
import { PlayerGameViewModel } from '../../../api/model/PlayerGameViewModel';
import { useObservable } from '../../../util/useObservable';

type Props = {
  gameId: string;
};

type RemoteChessGame = {
  isLoadingInitial: boolean;
  chessboard: Chessboard;
  handleMove: (move: MovePayload) => void;
  error: Maybe<Error>;
  gameState: PlayerGameViewModel;
  actionState: {
    isPending: boolean;
    error: Maybe<Error>;
    makeAction: (option: GameActionOptionV1) => void;
  };
};

const placeholderData: PlayerGameViewModel = {
  status: 'WAITING',
  players: { white: undefined, black: undefined },
  playerSide: 'spectator' as const,
  result: undefined,
  startedAt: undefined,
  isReadOnly: true,
  actionOptions: [],
  moves: [],
};

type GameStoreState = {
  viewModel: Maybe<PlayerGameViewModel>;
  chessboard: Chessboard;
};

type GameStoreActions = {
  setChessboard: (fn: (old: Chessboard) => Chessboard) => void;
  setViewModel: (viewModel: Maybe<PlayerGameViewModel>) => void;
};

type GameStore = GameStoreState & GameStoreActions;

const useGameStore = create<GameStore>()((set, get) => ({
  viewModel: undefined,
  chessboard: Chessboard.fromPosition(ChessPosition.standardInitial()),
  setChessboard: (fn: (old: Chessboard) => Chessboard) =>
    set({ chessboard: fn(get().chessboard) }),

  setViewModel: (viewModel) => {
    const chessboard = Chessboard.fromPosition(
      ChessPosition.standardInitial(),
      viewModel?.moves ?? []
    );
    set({ viewModel, chessboard });
  },
}));

export const useRemoteGame = (props: Props): RemoteChessGame => {
  const { games } = useApi();
  const { auth } = useAuth();
  const { chessboard, setChessboard, viewModel, setViewModel } = useGameStore();

  const {
    mutate: joinGame,
    error,
    isPending,
  } = useMutation({
    mutationFn: () => games.joinGame(props.gameId),
    onSuccess: (data) => {
      setViewModel(data);
    },
  });

  const {
    mutate: makeAction,
    error: makeActionError,
    isPending: isMakeActionPending,
  } = useMutation({
    mutationFn: (option: GameActionOptionV1) =>
      games.makeAction(props.gameId, option),
    onSuccess: (data) => {
      setViewModel(data);
    },
  });

  useEffect(() => {
    joinGame();
    return () => {
      games.leaveGame(props.gameId);
    };
  }, [joinGame, games, props.gameId]);

  const { mutateAsync: makeMoveRemote } = useMutation({
    mutationFn: (move: MovePayload) =>
      games.makeMove(props.gameId, Move.toUci(move)),
  });

  const gameObservable = useMemo(
    () =>
      auth?.session.userId
        ? games.observeGameState(props.gameId, auth?.session.userId)
        : undefined,
    [games, props.gameId, auth?.session.userId]
  );
  useObservable(gameObservable, (gameState) => {
    setViewModel(gameState);
  });
  const movesObservable = useMemo(
    () => games.observeMovesForGame(props.gameId),
    [games, props.gameId]
  );
  useObservable(movesObservable, (move) => {
    setChessboard((prev) => prev.playMove(move));
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
    gameState: viewModel || placeholderData,
    actionState: {
      isPending: isMakeActionPending,
      error: makeActionError ?? undefined,
      makeAction,
    },
  };
};
