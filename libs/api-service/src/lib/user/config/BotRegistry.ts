import { Maybe } from '@michess/common-utils';
import { BotConfig } from './model/BotConfig';

const BOT_REGISTRY: Record<string, BotConfig> = {
  'bot-gemini-1': {
    id: 'bot-gemini-1',
    name: 'Gemini 1',
    username: 'gemini-1',
    description: 'A balanced AI chess player powered by Gemini',
    provider: 'gemini',
    model: 'gemini-2.5-flash',
    personality:
      'You play balanced, solid chess. Consider both tactical and positional factors.',
    temperature: 0.7,
  },
};

const getBotConfig = (botId: string): Maybe<BotConfig> => {
  return BOT_REGISTRY[botId];
};

const index = (): BotConfig[] => {
  return Object.values(BOT_REGISTRY);
};

const isBotUser = (userId: string): boolean => {
  return BOT_REGISTRY[userId] !== undefined;
};

export const BotRegistry = {
  get: getBotConfig,
  getBotConfig,
  index,
  isBotUser,
};
