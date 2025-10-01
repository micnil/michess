import { MoveOption } from '@michess/core-board';
import { MoveNotation } from '../notation/SanNotation';
import { MoveGeneratorContext } from './MoveGeneratorContext';

type MoveGeneratorResultData = {
  moves: MoveOption[];
  isCheckmate: boolean;
  isCheck: boolean;
};
export type MoveGeneratorResult = MoveGeneratorResultData & {
  toSan: (
    move: MoveOption,
    moveGenResultAfter: MoveGeneratorResultData
  ) => string;
};

export const MoveGeneratorResult = {
  from: (
    context: MoveGeneratorContext,
    result: MoveGeneratorResultData
  ): MoveGeneratorResult => {
    return Object.assign(result, {
      toSan: (
        move: MoveOption,
        moveGenResultAfter: MoveGeneratorResultData
      ): string => {
        const sanWithoutChecks = MoveNotation.moveOptionToSan(
          move,
          context.piecePlacements,
          result.moves
        );

        const san = MoveNotation.addCheckNotation(
          sanWithoutChecks,
          moveGenResultAfter.isCheck,
          moveGenResultAfter.isCheckmate
        );
        return san;
      },
    });
  },
};
