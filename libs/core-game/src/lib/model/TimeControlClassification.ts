export type TimeControlClassification =
  | 'bullet'
  | 'blitz'
  | 'rapid'
  | 'correspondence'
  | 'no_clock';

export const TimeControlClassification = {
  fromRealtime: (
    initialSec: number,
    incrementSec: number,
  ): Extract<TimeControlClassification, 'bullet' | 'blitz' | 'rapid'> => {
    const estimatedGameTimeSec = initialSec + 40 * incrementSec;

    if (estimatedGameTimeSec < 180) {
      return 'bullet';
    } else if (estimatedGameTimeSec < 600) {
      return 'blitz';
    } else {
      return 'rapid';
    }
  },
};
