// export type GameState = GameMeta & {
//   players: GamePlayers;
//   status: GameStatusType;
//   result: Maybe<ChessGameResult>;
//   resultStr: string;
//   initialPosition: ChessPosition;
//   actionRecord: GameAction[];
//   movesRecord: MoveRecord[];
//   timeControl: TimeControl;
// };

import { Maybe } from '@michess/common-utils';
import { FenStr, MoveRecord } from '@michess/core-board';
import { RatingSnapshot } from '@michess/core-rating';
import { GameAction } from '../actions/model/GameAction';
import { ChessGameResult } from './ChessGameResult';
import { GameMeta } from './GameMeta';
import { GameStatusType } from './GameStatusType';
import { TimeControlIn } from './TimeControlIn';

type Player = {
  id: string;
  name: string;
  rating?: RatingSnapshot;
};

export type ChessGameIn = GameMeta & {
  players: {
    white: Maybe<Player>;
    black: Maybe<Player>;
  };
  status: GameStatusType;
  result: Maybe<ChessGameResult>;
  initialPosition: Maybe<FenStr>;
  actionRecord: GameAction[];
  movesRecord: MoveRecord[];
  timeControl: TimeControlIn;
};
