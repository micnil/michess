export type TimeControlJsonB =
  | {
      initial: number;
      increment: number;
    }
  | {
      daysPerMove: number;
    };
