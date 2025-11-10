export type TimeControlIn = {
  classification: 'bullet' | 'blitz' | 'rapid' | 'correspondence' | 'no_clock';
  initialSec?: number;
  incrementSec?: number;
  daysPerMove?: number;
};
