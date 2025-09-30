import { Session } from '@michess/api-service';
import type { Env } from 'hono-pino';
import type { RequestIdVariables } from 'hono/request-id';

export type RestContext = {
  Variables: Env['Variables'] &
    RequestIdVariables & {
      session: Session;
    };
};
