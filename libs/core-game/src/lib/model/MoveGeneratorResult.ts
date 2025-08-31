import { Move } from '@michess/core-models';

export type MoveGeneratorResult = {
  moves: Move[];
  isCheckmate: boolean;
  isCheck: boolean;
};
