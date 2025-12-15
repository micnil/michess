import { logger } from '@michess/be-utils';
import { BotConfig } from '../../user/config/model/BotConfig';
import { GeminiClient } from '../client/GeminiClient';
import { LlmClient } from '../client/LlmClient';
import { OpenAiClient } from '../client/OpenAiClient';
import { LlmConfig } from '../config/LlmConfig';

export class LlmClientFactory {
  static create(botConfig: BotConfig, config: LlmConfig): LlmClient {
    switch (botConfig.provider) {
      case 'gemini':
        return new GeminiClient(config.geminiApiKey, botConfig.model);
      case 'gpt':
        return new OpenAiClient(config.openAiApiKey, botConfig.model);
      case 'claude':
        logger.warn(
          { provider: botConfig.provider },
          'LLM provider not yet implemented, falling back to Gemini',
        );
        return new GeminiClient(config.geminiApiKey, botConfig.model);
      default:
        throw new Error(`Unknown LLM provider: ${botConfig.provider}`);
    }
  }
}
