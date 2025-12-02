import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useApi } from '../../../api/hooks/useApi';
import { PlayCard } from '../PlayCard';

type Props = {
  onPlay?: (gameId: string) => void;
};

export const PlayCardContainer = ({ onPlay }: Props) => {
  const api = useApi();
  const [isInQueue, setIsInQueue] = useState(false);

  const {
    mutateAsync: challengeBotAndJoin,
    error: botError,
    isPending: isBotPending,
  } = useMutation({
    mutationFn: async (params: {
      botId: string;
      timeControl: { initialSec: number; incrementSec: number };
    }) => {
      const gameDetails = await api.games.challengeBot(params);
      await api.games.joinGame(gameDetails.id);
      return gameDetails;
    },
    onSuccess: (data) => {
      if (onPlay) {
        onPlay(data.id);
      }
    },
  });

  const {
    mutateAsync: joinQueue,
    error: queueError,
    isPending: isQueuePending,
  } = useMutation({
    mutationFn: async (params: {
      timeControl: { initialSec: number; incrementSec: number };
    }) => {
      await api.games.joinMatchmakingQueue(params);
      setIsInQueue(true);
    },
  });

  useEffect(() => {
    const unsubscribe = api.games.onMatchFound(async (gameId) => {
      setIsInQueue(false);
      await api.games.joinGame(gameId);
      onPlay?.(gameId);
    });

    return unsubscribe;
  }, [api.games, onPlay]);

  const handlePlay = async (params: {
    timeControl: `${number}|${number}`;
    opponentType: 'random' | 'bot';
    botId?: string;
  }) => {
    const [initialMin, increment] = params.timeControl.split('|').map(Number);

    if (params.opponentType === 'bot' && params.botId) {
      await challengeBotAndJoin({
        botId: params.botId,
        timeControl: {
          initialSec: initialMin * 60,
          incrementSec: increment,
        },
      });
    } else if (params.opponentType === 'random') {
      await joinQueue({
        timeControl: {
          initialSec: initialMin * 60,
          incrementSec: increment,
        },
      });
    }
  };

  const handleCancel = async () => {
    await api.games.leaveMatchmakingQueue();
    setIsInQueue(false);
  };

  return (
    <PlayCard
      onPlay={handlePlay}
      onCancel={handleCancel}
      error={botError?.message || queueError?.message}
      loading={isBotPending || isQueuePending}
      isInQueue={isInQueue}
    />
  );
};
