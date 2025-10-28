import { Color } from '@michess/core-board';
import { Card, Text } from '@radix-ui/themes';
import { FC, useEffect, useState } from 'react';
import { CountdownClock } from '../../../api/model/CountdownClock';

type Props = {
  color: Color;
  clock: CountdownClock;
};

export const Clock: FC<Props> = ({ clock, color }: Props) => {
  const [time, setTime] = useState(() => clock.getFormattedClock(color));
  useEffect(() => {
    return clock.subscribe(color, (formattedTime) => {
      setTime(formattedTime);
    });
  }, [clock]);

  return (
    <Card
      size={'1'}
      style={{
        textAlign: 'center',
        width: '6rem',

        background: clock.isTicking(color)
          ? 'var(--accent-4)'
          : 'var(--color-background)',
      }}
      variant="classic"
    >
      <Text size={'5'}>{time}</Text>
    </Card>
  );
};
