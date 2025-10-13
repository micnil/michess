import { GameAction } from '@michess/core-game';
import { InsertAction } from '../model/InsertAction';
import { SelectAction } from '../model/SelectAction';
import { actions } from '../schema';
import { BaseRepository } from './BaseRepository';

export class ActionRepository extends BaseRepository {
  toInsertAction(gameId: string, action: GameAction): InsertAction {
    return {
      moveNumber: action.moveNumber,
      payload:
        action.type === 'accept_draw' ? { reason: action.reason } : undefined,
      gameId,
      color: action.color,
      type: action.type,
    };
  }

  async createAction(gameId: string, data: GameAction): Promise<SelectAction> {
    const [action] = await this.db
      .insert(actions)
      .values(this.toInsertAction(gameId, data))
      .returning();
    return action;
  }
}
