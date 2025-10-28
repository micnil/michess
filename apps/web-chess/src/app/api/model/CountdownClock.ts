import { ClockV1, TimeControlV1 } from '@michess/api-schema';
import { Color } from '@michess/core-board';

type CountdownClockOptions = {
  clockV1: ClockV1;
  timeControl: TimeControlV1;
  receivedAt: number;
  ticking?: Color;
};

type CountdownClockConstructorOptions = CountdownClockOptions & {
  lastKnownSyncedClock?: CountdownClock;
};

const isRealtimeTimeControl = (
  timeControl: TimeControlV1,
): timeControl is Extract<
  TimeControlV1,
  { classification: 'bullet' | 'blitz' | 'rapid' }
> => {
  return (
    timeControl.classification === 'bullet' ||
    timeControl.classification === 'blitz' ||
    timeControl.classification === 'rapid'
  );
};

const isCorrespondenceTimeControl = (
  timeControl: TimeControlV1,
): timeControl is Extract<
  TimeControlV1,
  { classification: 'correspondence' }
> => {
  return timeControl.classification === 'correspondence';
};

export class CountdownClock {
  private initialTimeLeftMs: { white: number; black: number };
  private receivedAt: number;
  private ticking?: Color;
  private lastKnownSyncedClock: CountdownClock;
  private timeControl: TimeControlV1;
  private incrementMs: number = 0;
  // days per move.
  private resetOnToggle: boolean = false;

  private constructor(options: CountdownClockConstructorOptions) {
    this.initialTimeLeftMs = {
      white: options.clockV1.whiteMs,
      black: options.clockV1.blackMs,
    };
    this.receivedAt = options.receivedAt;
    this.ticking = options.ticking;
    const timeControl = options.timeControl;
    this.timeControl = timeControl;
    this.lastKnownSyncedClock = options.lastKnownSyncedClock ?? this;

    if (isRealtimeTimeControl(timeControl)) {
      this.incrementMs = timeControl.incrementSec * 1000;
      this.resetOnToggle = false;
    } else if (isCorrespondenceTimeControl(timeControl)) {
      this.incrementMs = timeControl.daysPerMove * 24 * 60 * 60 * 1000;
      this.resetOnToggle = true;
    } else {
      this.incrementMs = 0;
      this.resetOnToggle = false;
    }
  }

  static fromRemote(options: CountdownClockOptions): CountdownClock {
    return new CountdownClock({
      clockV1: options.clockV1,
      timeControl: options.timeControl,
      receivedAt: options.receivedAt,
      ticking: options.ticking,
    });
  }

  isTicking(color: Color): boolean {
    return this.ticking === color;
  }

  sync(options: Omit<CountdownClockOptions, 'timeControl'>): CountdownClock {
    return CountdownClock.fromRemote({
      ...options,

      timeControl: this.timeControl,
    });
  }

  getTimeLeftMs(color: Color): number {
    if (this.ticking === color) {
      const elapsedMs = Date.now() - this.receivedAt;
      return Math.max(0, this.initialTimeLeftMs[color] - elapsedMs);
    } else {
      return this.initialTimeLeftMs[color];
    }
  }

  get whiteMs(): number {
    return this.getTimeLeftMs('white');
  }

  get blackMs(): number {
    return this.getTimeLeftMs('black');
  }

  getFormattedClock(color: Color): string {
    const totalSeconds = Math.max(
      0,
      Math.floor(this.getTimeLeftMs(color) / 1000),
    );
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }

  get whiteFormattedClock(): string {
    return this.getFormattedClock(Color.White);
  }

  get blackFormattedClock(): string {
    return this.getFormattedClock(Color.Black);
  }

  optimisticToggle(): CountdownClock {
    const newTicking = this.ticking ? Color.opposite(this.ticking) : undefined;

    const currentPlayerTimeMs = this.ticking
      ? this.getTimeLeftMs(this.ticking)
      : 0;
    const nextPlayerTimeMs = this.ticking
      ? this.getTimeLeftMs(Color.opposite(this.ticking))
      : 0;

    const updatedCurrentPlayerTimeMs = this.resetOnToggle
      ? this.incrementMs
      : currentPlayerTimeMs + this.incrementMs;

    return new CountdownClock({
      clockV1: {
        whiteMs:
          this.ticking === 'white'
            ? updatedCurrentPlayerTimeMs
            : nextPlayerTimeMs,
        blackMs:
          this.ticking === 'black'
            ? updatedCurrentPlayerTimeMs
            : nextPlayerTimeMs,
      },
      receivedAt: Date.now(),
      ticking: newTicking,
      timeControl: this.timeControl,
      lastKnownSyncedClock: this.lastKnownSyncedClock,
    });
  }

  resetToLastSynced(): CountdownClock {
    return new CountdownClock({
      clockV1: {
        blackMs: this.lastKnownSyncedClock.blackMs,
        whiteMs: this.lastKnownSyncedClock.whiteMs,
      },
      timeControl: this.lastKnownSyncedClock.timeControl,
      receivedAt: this.lastKnownSyncedClock.receivedAt,
      ticking: this.lastKnownSyncedClock.ticking,
      lastKnownSyncedClock: this.lastKnownSyncedClock,
    });
  }

  subscribe(
    color: Color,
    callback: (formattedTime: string) => void,
  ): () => void {
    // For immediate update
    const timeoutId = setTimeout(() => {
      callback(this.getFormattedClock(color));
    }, 0);
    const intervalId = setInterval(
      () => {
        callback(this.getFormattedClock(color));
      },
      this.ticking === color ? 100 : 100000,
    );

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }
}
