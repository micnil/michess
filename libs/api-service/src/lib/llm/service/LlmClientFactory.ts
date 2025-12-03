import { logger } from '@michess/be-utils';
import { BotConfig } from '../../user/config/model/BotConfig';
import { GeminiClient } from '../client/GeminiClient';
import { LlmClient } from '../client/LlmClient';

export class LlmClientFactory {
  static create(botConfig: BotConfig, apiKey: string): LlmClient {
    switch (botConfig.provider) {
      case 'gemini':
        return new GeminiClient(apiKey, botConfig.model);
      case 'claude':
      case 'gpt':
        logger.warn(
          { provider: botConfig.provider },
          'LLM provider not yet implemented, falling back to Gemini',
        );
        return new GeminiClient(apiKey, botConfig.model);
      default:
        throw new Error(`Unknown LLM provider: ${botConfig.provider}`);
    }
  }
}
