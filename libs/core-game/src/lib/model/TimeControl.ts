import { TimeControlClassification } from './TimeControlClassification';

export type TimeControl =
  | {
      classification: Extract<
        TimeControlClassification,
        'bullet' | 'blitz' | 'rapid'
      >;
      initialSec: number;
      incrementSec: number;
    }
  | {
      classification: Extract<TimeControlClassification, 'correspondence'>;
      daysPerMove: number;
    }
  | {
      classification: Extract<TimeControlClassification, 'no_clock'>;
    };

export const TimeControl = {
  noClock: (): TimeControl => ({
    classification: 'no_clock',
  }),
  realtime: (initialSec: number, incrementSec: number): TimeControl => ({
    classification: TimeControlClassification.fromRealtime(
      initialSec,
      incrementSec,
    ),
    initialSec,
    incrementSec,
  }),
  correspondence: (daysPerMove: number = 1): TimeControl => ({
    classification: 'correspondence',
    daysPerMove,
  }),
};
