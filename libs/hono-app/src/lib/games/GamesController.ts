import { Hono } from 'hono';
import { CreateGameV1, CreateGameV1Schema } from '@michess/api-schema';
import { GamesService } from '@michess/api-service';
import { zValidator } from '@hono/zod-validator';

export const GamesController = new Hono().post(
  '/',
  zValidator('json', CreateGameV1Schema),
  (c) => {
    const body: CreateGameV1 = c.req.valid('json');
    const response = new GamesService().createGame(body);
    return c.json(response);
  }
);
