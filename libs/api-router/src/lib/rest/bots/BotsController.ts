import { BotService } from '@michess/api-service';
import { Hono } from 'hono';
import { RestContext } from '../../model/RestContext';

export const BotsController = (botService: BotService): Hono<RestContext> => {
  return new Hono<RestContext>().get('/', async (c) => {
    const bots = await botService.listBots();
    return c.json(bots);
  });
};
