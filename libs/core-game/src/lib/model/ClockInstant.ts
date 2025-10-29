import { Color } from '@michess/core-board';
import { ClockSettings } from './ClockSettings';

export type ClockInstant = {
  whiteMs: number;
  blackMs: number;
};

const MS_PER_SEC = 1000;

const daysToMs = (days: number): number => days * 24 * 60 * 60 * MS_PER_SEC;

export const ClockInstant = {
  fromSettings(clockSettings: ClockSettings): ClockInstant {
    if (clockSettings.type === 'standard') {
      return {
        whiteMs: clockSettings.initialSec * MS_PER_SEC,
        blackMs: clockSettings.initialSec * MS_PER_SEC,
      };
    } else {
      return {
        whiteMs: daysToMs(clockSettings.daysPerMove),
        blackMs: daysToMs(clockSettings.daysPerMove),
      };
    }
  },
  update(instant: ClockInstant, color: Color, newTime: number): ClockInstant {
    if (color === Color.White) {
      return {
        whiteMs: newTime,
        blackMs: instant.blackMs,
      };
    } else {
      return {
        whiteMs: instant.whiteMs,
        blackMs: newTime,
      };
    }
  },
  getTimeMs(instant: ClockInstant, color: Color): number {
    return color === Color.White ? instant.whiteMs : instant.blackMs;
  },
};
