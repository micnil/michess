import { assertEqual } from '@michess/common-utils';
import { Color } from '@michess/core-board';
import { ChessClock } from '../ChessClock';
import { ClockSettings } from '../model/ClockSettings';
jest.useFakeTimers();
describe('ChessClock', () => {
  const defaultSettings: ClockSettings = ClockSettings.standard(300, 5);

  describe('from', () => {
    it('should create a new unstarted clock', () => {
      const clock = ChessClock.from(defaultSettings);
      expect(clock.lastEvent).toBeUndefined();
    });

    it('should have initial time for both sides', () => {
      const clock = ChessClock.from(defaultSettings);
      const instant = clock.instant;
      expect(instant.whiteMs).toBe(300000);
      expect(instant.blackMs).toBe(300000);
    });
  });

  describe('hit', () => {
    it('should start the clock on first hit', () => {
      const clock = ChessClock.from(defaultSettings);
      const timestamp = 1000;
      const clock2 = clock.hit(Color.White, timestamp);

      expect(clock2.lastEvent).toBeDefined();
      expect(clock2.lastEvent.type).toBe('hit');
      assertEqual(clock2.lastEvent.type, 'hit');
      expect(clock2.lastEvent.side).toBe(Color.White);
      expect(clock2.lastEvent.timestamp).toBe(timestamp);
    });

    it('should set initial times on first hit', () => {
      const clock = ChessClock.from(defaultSettings);
      const clock2 = clock.hit(Color.White, 1000);

      expect(clock2.lastEvent.clock.whiteMs).toBe(300000);
      expect(clock2.lastEvent.clock.blackMs).toBe(300000);
    });

    it('should allow hitting the opposite side after previous hit', () => {
      const clock = ChessClock.from(defaultSettings);
      const clock2 = clock.hit(Color.White, 1000);
      const clock3 = clock2.hit(Color.Black, 2000);

      expect(clock3.lastEvent.type).toBe('hit');
      assertEqual(clock3.lastEvent.type, 'hit');
      expect(clock3.lastEvent.side).toBe(Color.Black);
    });

    it('should throw error if hitting same side twice', () => {
      const clock = ChessClock.from(defaultSettings);
      const clock2 = clock.hit(Color.White, 1000);

      expect(() => clock2.hit(Color.White, 2000)).toThrow(
        "It's not white to move",
      );
    });

    it('should apply increment when hitting a running clock', () => {
      const clock = ChessClock.from(defaultSettings);
      const clock2 = clock.hit(Color.White, 1000);
      const clock3 = clock2.hit(Color.Black, 2000);

      // White's clock doesn't change when Black hits (no increment applied to White)
      expect(clock3.lastEvent.clock.whiteMs).toBe(300000);
      // Made move in 1 second and and got 5 seconds increment.
      expect(clock3.lastEvent.clock.blackMs).toBe(304000);
    });

    it('should create flag event when time runs out', () => {
      const settings: ClockSettings = ClockSettings.standard(1, 0);
      const clock = ChessClock.from(settings);
      const clock2 = clock.hit(Color.White, 1000);
      const clock3 = clock2.hit(Color.Black, 3000);

      expect(clock3.lastEvent.type).toBe('flag');
      assertEqual(clock3.lastEvent.type, 'flag');
      // Black's clock ran from 1000 to 3000 (2000ms) which exceeds the 1000ms initial time
      expect(clock3.lastEvent.color).toBe(Color.Black);
      expect(clock3.lastEvent.clock.blackMs).toBe(0);
    });

    it('should not allow hitting after flag (noop)', () => {
      const settings: ClockSettings = ClockSettings.standard(1, 0);
      const clock = ChessClock.from(settings);
      const clock2 = clock.hit(Color.White, 1000);
      const clock3 = clock2.hit(Color.Black, 3000);

      expect(clock3.lastEvent.type).toBe('flag');

      const clock4 = clock3.hit(Color.White, 4000);
      expect(clock4.lastEvent.type).toBe('flag');
      expect(clock4.lastEvent).toEqual(clock3.lastEvent);
    });

    it('should resume after pause', () => {
      const clock = ChessClock.from(defaultSettings);
      const clock2 = clock.hit(Color.White, 1000);
      const clock3 = clock2.pause(2000);
      const clock4 = clock3.hit(Color.Black, 3000);

      expect(clock4.lastEvent.type).toBe('hit');
      assertEqual(clock4.lastEvent.type, 'hit');
      expect(clock4.lastEvent.side).toBe(Color.Black);
      expect(clock4.lastEvent.clock).toEqual(clock3.lastEvent.clock);
    });

    it('should reset time to full daysPerMove on each hit', () => {
      const clock = ChessClock.from(ClockSettings.correspondence(3));
      const clock2 = clock.hit(Color.White, 1000);

      // After White hits, Black's clock starts running
      const oneDayMs = 1 * 24 * 60 * 60 * 1000;
      const clock3 = clock2.hit(Color.Black, 1000 + oneDayMs); // 1 day elapsed

      assertEqual(clock3.lastEvent.type, 'hit');
      const fullTimeMs = 3 * 24 * 60 * 60 * 1000; // Full 3 days

      // Black hit after 1 day, so gets reset to full time
      expect(clock3.lastEvent.clock.blackMs).toBe(fullTimeMs);
      // White's clock was not running, stays at initial
      expect(clock3.lastEvent.clock.whiteMs).toBe(fullTimeMs);
    });
  });

  describe('pause', () => {
    it('should throw error when pausing unstarted clock', () => {
      const clock = ChessClock.from(defaultSettings);
      expect(() => clock.pause()).toThrow(
        'Cannot pause a clock that has not started yet',
      );
    });

    it('should pause the clock after a hit', () => {
      const clock = ChessClock.from(defaultSettings);
      const clock2 = clock.hit(Color.White, 1000);
      const clock3 = clock2.pause(2000);

      expect(clock3.lastEvent.type).toBe('pause');
    });

    it('should preserve time when pausing', () => {
      const clock = ChessClock.from(defaultSettings);
      const clock2 = clock.hit(Color.White, 1000);
      const clock3 = clock2.pause(3000);

      // Black's clock was running from 1000 to 3000 (2000ms elapsed)
      expect(clock3.lastEvent.clock.blackMs).toBe(300000 - 2000);
      // White's clock is unchanged from initial
      expect(clock3.lastEvent.clock.whiteMs).toBe(300000);
    });

    it('should be a no-op when pausing an already paused clock', () => {
      const clock = ChessClock.from(defaultSettings);
      const clock2 = clock.hit(Color.White, 1000);
      const clock3 = clock2.pause(2000);
      const clock4 = clock3.pause(3000);

      expect(clock4.lastEvent).toEqual(clock3.lastEvent);
    });

    it('should create flag event when pausing after time runs out', () => {
      const settings: ClockSettings = ClockSettings.standard(1, 0);
      const clock = ChessClock.from(settings);
      const clock2 = clock.hit(Color.White, 1000);
      const clock3 = clock2.pause(3000);

      expect(clock3.lastEvent.type).toBe('flag');
      assertEqual(clock3.lastEvent.type, 'flag');
      expect(clock3.lastEvent.color).toBe(Color.Black);
    });

    it('should not allow pausing after flag', () => {
      const settings: ClockSettings = ClockSettings.standard(1, 0);
      const clock = ChessClock.from(settings);
      const clock2 = clock.hit(Color.White, 1000);
      const clock3 = clock2.pause(3000);

      expect(clock3.lastEvent.type).toBe('flag');

      const clock4 = clock3.pause(4000);
      expect(clock4.lastEvent).toEqual(clock3.lastEvent);
    });
  });

  describe('instant', () => {
    beforeEach(() => {
      jest.setSystemTime(5000);
    });
    it('should return current clock state', () => {
      const clock = ChessClock.from(defaultSettings);
      const instant = clock.instant;

      expect(instant.whiteMs).toBe(300000);
      expect(instant.blackMs).toBe(300000);
    });

    it('should return decremented time for running clock after 2 seconds', () => {
      jest.setSystemTime(3000);
      const clock = ChessClock.from(defaultSettings);
      const clock2 = clock.hit(Color.White, 1000);

      const instant = clock2.instant;
      expect(instant.whiteMs).toBe(300000);
      expect(instant.blackMs).toBe(300000 - 2000);
    });

    it('should not go below zero for flagged player', () => {
      jest.setSystemTime(3000);
      const settings: ClockSettings = ClockSettings.standard(1, 0);
      const clock = ChessClock.from(settings);
      const clock2 = clock.hit(Color.White, 1000);

      const instant = clock2.instant;
      expect(instant.blackMs).toBe(0);
    });

    it('should freeze time when paused', () => {
      const clock = ChessClock.from(defaultSettings);
      const clock2 = clock.hit(Color.White, 1000);
      const clock3 = clock2.pause(2000);
      const instant = clock3.instant;

      // When paused, time is frozen
      expect(instant.whiteMs).toBe(300000);
      expect(instant.blackMs).toBe(300000 - 1000);
    });
  });
});
