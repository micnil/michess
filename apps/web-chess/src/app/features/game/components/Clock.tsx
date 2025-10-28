import { Color } from '@michess/core-board';
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
    <div className={`clock ${clock.isTicking(color) ? 'active' : 'paused'}`}>
      <span className="time">{time}</span>
    </div>
  );
};
