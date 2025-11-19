import { BotInfoV1 } from '@michess/api-schema';
import { logger } from '@michess/be-utils';
import { UserRepository } from '@michess/infra-db';
import { BotRegistry } from '../config/BotRegistry';

export class BotService {
  constructor(private readonly userRepository: UserRepository) {}

  async initialize(): Promise<void> {
    logger.info('Initializing bot users...');

    const bots = BotRegistry.index();

    for (const bot of bots) {
      const existingUser = await this.userRepository.findUserById(bot.id);

      if (!existingUser) {
        await this.userRepository.createUser({
          id: bot.id,
          name: bot.name,
          username: bot.username,
          email: `${bot.username}@bot.michess.com`,
          emailVerified: true,
          role: 'bot',
          isAnonymous: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        logger.info({ botId: bot.id, botName: bot.name }, 'Bot user created');
      } else {
        await this.userRepository.updateUser(bot.id, {
          id: bot.id,
          name: bot.name,
          username: bot.username,
          email: `${bot.username}@bot.michess.com`,
          emailVerified: true,
          role: 'bot',
          isAnonymous: false,
          updatedAt: new Date(),
        });

        logger.debug({ botId: bot.id }, 'Bot user already exists, updated');
      }
    }

    logger.info({ count: bots.length }, 'Bot initialization complete');
  }

  async listBots(): Promise<BotInfoV1[]> {
    const botUsers = await this.userRepository.listBots();

    return botUsers.map((botUser) => {
      const botConfig = BotRegistry.get(botUser.id);

      return {
        id: botUser.id,
        name: botUser.name,
        username: botUser.username ?? botUser.id,
        description: botConfig?.description ?? '',
      };
    });
  }
}
