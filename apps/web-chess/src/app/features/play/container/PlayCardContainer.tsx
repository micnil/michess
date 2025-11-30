import { useMutation } from '@tanstack/react-query';
import { useApi } from '../../../api/hooks/useApi';
import { PlayCard } from '../PlayCard';

type Props = {
  onPlay?: (gameId: string) => void;
};

export const PlayCardContainer = ({ onPlay }: Props) => {
  const api = useApi();

  const {
    mutateAsync: challengeBotAndJoin,
    error,
    isPending,
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

  const handlePlay = async (params: {
    timeControl: `${number}|${number}`;
    opponentType: 'random' | 'bot';
    botId?: string;
  }) => {
    if (params.opponentType === 'bot' && params.botId) {
      const [initialMin, increment] = params.timeControl.split('|').map(Number);
      await challengeBotAndJoin({
        botId: params.botId,
        timeControl: {
          initialSec: initialMin * 60,
          incrementSec: increment,
        },
      });
    }
  };

  return (
    <PlayCard onPlay={handlePlay} error={error?.message} loading={isPending} />
  );
};
