import { PaginationQueryV1Schema } from '../common/PaginationQueryV1Schema';
import { GameStatusTypeV1Schema } from '../game/GameStatusTypeV1Schema';

export const PlayerGameInfoQueryV1Schema = PaginationQueryV1Schema.extend({
  status: GameStatusTypeV1Schema.exclude(['EMPTY', 'WAITING']).optional(),
});
