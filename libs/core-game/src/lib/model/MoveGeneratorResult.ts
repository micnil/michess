import { Move } from '@michess/core-board';

export type MoveGeneratorResult = {
  moves: Move[];
  isCheckmate: boolean;
  isCheck: boolean;
};
