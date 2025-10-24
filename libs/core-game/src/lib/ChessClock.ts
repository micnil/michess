import { Maybe } from '@michess/common-utils';
import { Color } from '@michess/core-board';
import { ClockSettings } from './model/ClockSettings';
import { GameState } from './model/GameState';

const MS_PER_SEC = 1000;

const daysToMs = (days: number): number => days * 24 * 60 * 60 * MS_PER_SEC;

type ClockInstant = {
  whiteMs: number;
  blackMs: number;
};

const ClockInstant = {
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

type ClockEvent =
  | {
      type: 'hit';
      side: Color;
      timestamp: number;
      clock: ClockInstant;
    }
  | { type: 'pause'; timestamp: number; clock: ClockInstant }
  | { type: 'flag'; timestamp: number; clock: ClockInstant; color: Color };

const ClockEvent = {
  toFlag(timestamp: number, color: Color, baseClock: ClockInstant): ClockEvent {
    const result: ClockEvent = {
      type: 'flag',
      timestamp,
      color,
      clock: ClockInstant.update(baseClock, color, 0),
    };
    return result;
  },
};

export class ChessClock<Event extends Maybe<ClockEvent> = Maybe<ClockEvent>> {
  constructor(
    private clockSettings: ClockSettings,
    public lastEvent: Event,
  ) {}

  static from(clockSettings: ClockSettings): ChessClock<undefined> {
    return new ChessClock(clockSettings, undefined);
  }
  static fromGameState(gameState: GameState): ChessClock {
    const initialTurn = gameState.initialPosition.turn;
    const clockSettings = ClockSettings.fromGameState(gameState);
    return gameState.movesRecord.reduce<ChessClock<ClockEvent | undefined>>(
      (clock, moveRecord, index) => {
        return clock.hit(
          initialTurn === Color.White
            ? index % 2 === 0
              ? Color.White
              : Color.Black
            : index % 2 === 0
              ? Color.Black
              : Color.White,
          moveRecord.timestamp,
        );
      },
      ChessClock.from(clockSettings),
    );
  }

  private getClockInstantAt(timestamp: number): ClockInstant {
    if (this.lastEvent) {
      if (this.lastEvent.type === 'flag' || this.lastEvent.type === 'pause') {
        return this.lastEvent.clock;
      } else {
        const clockRunningSide = Color.opposite(this.lastEvent.side);
        const timeLeftAtLastEventMs = ClockInstant.getTimeMs(
          this.lastEvent.clock,
          clockRunningSide,
        );
        const timeSinceLastEventMs = timestamp - this.lastEvent.timestamp;
        const timeLeft = timeLeftAtLastEventMs - timeSinceLastEventMs;
        return ClockInstant.update(
          this.lastEvent.clock,
          clockRunningSide,
          Math.max(0, timeLeft),
        );
      }
    } else {
      return ClockInstant.fromSettings(this.clockSettings);
    }
  }

  public get instant(): ClockInstant {
    return this.getClockInstantAt(Date.now());
  }

  hit(side: Color, hitTimestamp?: number): ChessClock<ClockEvent> {
    const lastEvent = this.lastEvent;
    if (!lastEvent) {
      return new ChessClock(this.clockSettings, {
        type: 'hit',
        side,
        timestamp: hitTimestamp ?? Date.now(),
        clock: ClockInstant.fromSettings(this.clockSettings),
      });
    }

    if (lastEvent.type === 'flag') {
      return new ChessClock(this.clockSettings, lastEvent);
    }

    const newTimestamp = hitTimestamp ?? Date.now();

    if (lastEvent.type === 'pause') {
      return new ChessClock(this.clockSettings, {
        type: 'hit',
        side,
        timestamp: newTimestamp,
        clock: lastEvent.clock,
      });
    }

    if (lastEvent.side === side) {
      throw new Error(`It's not ${side} to move`);
    }

    const currentInstant = this.getClockInstantAt(newTimestamp);
    const timeLeftMs = ClockInstant.getTimeMs(currentInstant, side);

    if (timeLeftMs <= 0) {
      return new ChessClock(
        this.clockSettings,
        ClockEvent.toFlag(newTimestamp, side, lastEvent.clock),
      );
    }

    const timeLeftAfterHitMs =
      this.clockSettings.type === 'standard'
        ? timeLeftMs + this.clockSettings.incrementSec * MS_PER_SEC
        : daysToMs(this.clockSettings.daysPerMove);
    return new ChessClock(this.clockSettings, {
      type: 'hit',
      side,
      timestamp: newTimestamp,
      clock: ClockInstant.update(lastEvent.clock, side, timeLeftAfterHitMs),
    });
  }

  pause(timestamp?: number): ChessClock<ClockEvent> {
    const lastEvent = this.lastEvent;
    if (!lastEvent) {
      throw new Error('Cannot pause a clock that has not started yet');
    }

    if (lastEvent.type === 'flag' || lastEvent.type === 'pause') {
      return new ChessClock(this.clockSettings, lastEvent);
    }

    const newTimestamp = timestamp ?? Date.now();
    const currentInstant = this.getClockInstantAt(newTimestamp);
    const sideToMove = Color.opposite(lastEvent.side);
    const timeLeft = ClockInstant.getTimeMs(currentInstant, sideToMove);

    if (timeLeft <= 0) {
      return new ChessClock(
        this.clockSettings,
        ClockEvent.toFlag(newTimestamp, sideToMove, lastEvent.clock),
      );
    }

    return new ChessClock(this.clockSettings, {
      type: 'pause',
      timestamp: newTimestamp,
      clock: ClockInstant.update(lastEvent.clock, sideToMove, timeLeft),
    });
  }
}
