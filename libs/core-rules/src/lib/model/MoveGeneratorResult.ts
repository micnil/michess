import { Move } from './Move';

export type MoveGeneratorResult = {
  moves: Move[];
  isCheckmate: boolean;
  isCheck: boolean;
};
