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
};
