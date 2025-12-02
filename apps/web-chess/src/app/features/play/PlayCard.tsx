import { Maybe } from '@michess/common-utils';
import { Button, Card, Flex, Heading } from '@radix-ui/themes';
import { useState } from 'react';
import { Alert } from '../../components/Alert';
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
  onCancel?: () => void;
  error?: Maybe<string>;
  loading?: boolean;
  isInQueue?: boolean;
};

export const PlayCard = ({
  onPlay,
  onCancel,
  error,
  loading,
  isInQueue,
}: Props) => {
  const [timeControl, setTimeControl] = useState<TimeControlStr>('3|2');
  const [opponentType, setOpponentType] = useState<OpponentType>('random');
  const [botId, setBotId] = useState<string | undefined>(undefined);

  const handlePlay = () => {
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

        <Alert text={error} />

        <Flex gap="3" align="center">
          <TimeControlSelector value={timeControl} onChange={setTimeControl} />
        </Flex>

        <OpponentTypeSelector value={opponentType} onChange={setOpponentType} />

        {opponentType === 'bot' && (
          <BotSelector value={botId} onChange={setBotId} />
        )}

        {isInQueue ? (
          <Button size="3" onClick={onCancel} variant="soft" color="red">
            Cancel
          </Button>
        ) : (
          <Button
            size="3"
            onClick={handlePlay}
            disabled={opponentType === 'bot' && !botId}
            loading={loading}
          >
            {loading ? 'Finding opponent...' : 'Play'}
          </Button>
        )}
      </Flex>
    </Card>
  );
};
