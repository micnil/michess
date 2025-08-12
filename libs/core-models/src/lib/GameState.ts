import { Maybe } from '@michess/common-utils';
import { ChessPosition } from './ChessPosition';
import { GameResultType } from './GameResultType';
import { Move } from './Move';

export type GameState = ChessPosition & {
  resultStr: string;
  result: Maybe<GameResultType>;
  moves: Move[];
};
