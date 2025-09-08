import { MoveOption } from '../move/MoveOption';

export type MoveGeneratorResult = {
  moves: MoveOption[];
  isCheckmate: boolean;
  isCheck: boolean;
};
