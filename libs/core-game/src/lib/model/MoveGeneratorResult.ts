import { MoveOption } from '@michess/core-board';

export type MoveGeneratorResult = {
  moves: MoveOption[];
  isCheckmate: boolean;
  isCheck: boolean;
};
