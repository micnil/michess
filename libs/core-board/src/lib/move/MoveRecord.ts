import { Move } from './Move';

export type MoveRecord = Move & {
  timestamp: number;
};

export const MoveRecord = {
  fromMove(move: Move): MoveRecord {
    return {
      ...move,
      timestamp: Date.now(),
    };
  },
  isRecord(obj: Move | MoveRecord): obj is MoveRecord {
    return 'timestamp' in obj && typeof obj.timestamp === 'number';
  },
};
