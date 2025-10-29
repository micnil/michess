import { Color } from '@michess/core-board';
import { Box, Text } from '@radix-ui/themes';
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
  const isTicking = clock.isTicking(color);
  const isCloseToFlag = clock.isCloseToFlag(color);
  return (
    <Box
      style={{
        textAlign: 'center',
        width: '6rem',
        borderRadius: '10px',
        boxShadow: isTicking
          ? `6px 6px 10px #111111aa,
             -6px -6px 10px #323232aa`
          : `inset 6px 6px 10px #111111aa,
            inset -6px -6px 10px #323232aa`,
        background: 'var(--color-background)',
      }}
      p={'2'}
    >
      <Text
        size={'5'}
        weight={isTicking ? 'bold' : 'regular'}
        color={isCloseToFlag ? 'tomato' : undefined}
        style={{
          fontFamily: `'Menlo', 'Consolas (Custom)', 'Bitstream Vera Sans Mono', monospace, 'Apple Color Emoji', 'Segoe UI Emoji'`,
        }}
      >
        {time}
      </Text>
    </Box>
  );
};
