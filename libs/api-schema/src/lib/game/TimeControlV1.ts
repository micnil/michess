export type TimeControlV1 =
  | {
      classification: 'rapid' | 'blitz' | 'bullet';
      initialSec: number;
      incrementSec: number;
    }
  | {
      classification: 'correspondence';
      daysPerMove: number;
    }
  | {
      classification: 'no_clock';
    };
