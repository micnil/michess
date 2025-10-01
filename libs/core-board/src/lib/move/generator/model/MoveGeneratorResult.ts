import { MoveOption } from '../../MoveOption';

export type MoveGeneratorResult = {
  moves: MoveOption[];
  isCheckmate: boolean;
  isCheck: boolean;
};
