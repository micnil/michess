import { Color } from '@michess/core-models';
import { ChessBitboard, IChessboard } from '@michess/core-state';

export type MoveGeneratorContext = {
  board: IChessboard;
  bitboards: ChessBitboard;
  isTurn(color: Color): boolean;
};
