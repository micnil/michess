import {
  CreateGameV1,
  CreateGameV1Schema,
  PaginationQueryV1,
  PaginationQueryV1Schema,
  PlayerGameInfoQueryV1,
  PlayerGameInfoQueryV1Schema,
} from '@michess/api-schema';
import { GamesService } from '@michess/api-service';
import { Hono } from 'hono';
import { RestContext } from '../../model/RestContext';
import { zValidator } from '../util/zValidator';

export const GamesController = (
  gameService: GamesService
): Hono<RestContext> => {
  return new Hono<RestContext>()
    .post('/', zValidator('json', CreateGameV1Schema), async (c) => {
      const body: CreateGameV1 = c.req.valid('json');
      const response = await gameService.createGame(body);
      return c.json(response);
    })
    .get('/lobby', zValidator('query', PaginationQueryV1Schema), async (c) => {
      const query: PaginationQueryV1 = c.req.valid('query');
      const response = await gameService.queryLobby(query);
      return c.json(response);
    })
    .get('/my', zValidator('query', PlayerGameInfoQueryV1Schema), async (c) => {
      c.var.logger.info(
        {
          userId: c.get('session').userId,
        },
        'Fetching player games'
      );
      const query: PlayerGameInfoQueryV1 = c.req.valid('query');
      const response = await gameService.queryPlayerGames(
        c.get('session').userId,
        query
      );
      return c.json(response);
    });
};
