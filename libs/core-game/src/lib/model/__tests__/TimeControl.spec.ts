import { TimeControl } from '../TimeControl';

describe('TimeControl', () => {
  describe('realtime', () => {
    it('should classify as bullet for < 3 minutes', () => {
      const result = TimeControl.realtime(120, 1);
      expect(result.classification).toBe('bullet');
    });

    it('should classify as blitz for 3-10 minutes', () => {
      const result = TimeControl.realtime(300, 5);
      expect(result.classification).toBe('blitz');
    });

    it('should classify as rapid for >= 10 minutes', () => {
      const result = TimeControl.realtime(600, 10);
      expect(result.classification).toBe('rapid');
    });
  });
});
