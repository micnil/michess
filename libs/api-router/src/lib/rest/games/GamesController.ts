import { zValidator } from '@hono/zod-validator';
import {
  CreateGameV1,
  CreateGameV1Schema,
  PaginationQueryV1,
  PaginationQueryV1Schema,
} from '@michess/api-schema';
import { GamesService } from '@michess/api-service';
import { Hono } from 'hono';
import { RestContext } from '../../model/RestContext';

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
    });
};
