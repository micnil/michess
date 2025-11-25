import { Button, Card, Flex, Heading } from '@radix-ui/themes';
import { useState } from 'react';
import { BotSelector } from './components/BotSelector';
import { OpponentTypeSelector } from './components/OpponentTypeSelector';
import { TimeControlSelector } from './components/TimeControlSelector';

type TimeControlStr = `${number}|${number}`;
type OpponentType = 'random' | 'bot';

type Props = {
  onPlay?: (params: {
    timeControl: TimeControlStr;
    opponentType: OpponentType;
    botId?: string;
  }) => void;
};

export const PlayCard = ({ onPlay }: Props) => {
  const [timeControl, setTimeControl] = useState<TimeControlStr>('3|2');
  const [opponentType, setOpponentType] = useState<OpponentType>('random');
  const [botId, setBotId] = useState<string | undefined>(undefined);

  const handlePlay = () => {
    // TODO: Wire up to backend API
    // - If opponentType === 'random': create quick pairing or join queue
    // - If opponentType === 'bot': POST /api/games/challenge with botId
    onPlay?.({
      timeControl,
      opponentType,
      botId: opponentType === 'bot' ? botId : undefined,
    });
  };

  return (
    <Card size="3" style={{ padding: '24px' }}>
      <Flex direction="column" gap="4">
        <Heading size="4" weight="medium">
          Play
        </Heading>

        <Flex gap="3" align="center">
          <TimeControlSelector value={timeControl} onChange={setTimeControl} />
        </Flex>

        <OpponentTypeSelector value={opponentType} onChange={setOpponentType} />

        {opponentType === 'bot' && (
          <BotSelector value={botId} onChange={setBotId} />
        )}

        <Button size="3" onClick={handlePlay}>
          Play
        </Button>
      </Flex>
    </Card>
  );
};
