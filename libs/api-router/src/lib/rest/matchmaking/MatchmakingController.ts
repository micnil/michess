import {
  JoinMatchmakingQueueV1,
  JoinMatchmakingQueueV1Schema,
} from '@michess/api-schema';
import { MatchmakingService } from '@michess/api-service';
import { Hono } from 'hono';
import { RestContext } from '../../model/RestContext';
import { zValidator } from '../util/zValidator';

export const MatchmakingController = (
  matchmakingService: MatchmakingService,
): Hono<RestContext> => {
  return new Hono<RestContext>()
    .post(
      '/join',
      zValidator('json', JoinMatchmakingQueueV1Schema),
      async (c) => {
        const body: JoinMatchmakingQueueV1 = c.req.valid('json');
        const session = c.get('session');

        await matchmakingService.joinQueue(session.userId, session.name, {
          variant: body.variant ?? 'standard',
          timeControlClassification:
            body.timeControl?.type === 'realtime' ? 'rapid' : 'no_clock',
          timeControl:
            body.timeControl?.type === 'realtime'
              ? {
                  initialSec: body.timeControl.initialSec,
                  incrementSec: body.timeControl.incrementSec,
                }
              : undefined,
        });

        return c.json({ status: 'ok' });
      },
    )
    .delete('/leave', async (c) => {
      const session = c.get('session');
      const removed = await matchmakingService.leaveQueue(session.userId);

      return c.json({ removed });
    });
};
