import { logger } from '@michess/be-utils';
import OpenAI from 'openai';
import { LlmResponse } from '../model/LlmMessage';
import { LlmRequest } from '../model/LlmRequest';
import { LlmClient } from './LlmClient';

export class DeepSeekClient implements LlmClient {
  private client: OpenAI;

  constructor(
    apiKey: string,
    private readonly modelName: string,
  ) {
    this.client = new OpenAI({
      apiKey,
      baseURL: 'https://api.deepseek.com',
    });
  }

  async generateResponse(request: LlmRequest): Promise<LlmResponse> {
    try {
      const completion = await this.client.chat.completions.create({
        model: this.modelName,
        messages: [
          { role: 'system', content: request.systemPrompt },
          { role: 'user', content: request.userPrompt },
        ],
        temperature: request.temperature,
      });

      const choice = completion.choices[0];
      const text = choice?.message?.content ?? '';
      const finishReason = choice?.finish_reason ?? 'unknown';

      logger.debug(
        {
          modelName: this.modelName,
          promptLength: request.userPrompt.length,
          responseLength: text.length,
        },
        'DeepSeek API call successful',
      );

      return {
        content: text,
        finishReason: finishReason === 'stop' ? 'stop' : 'error',
      };
    } catch (error) {
      logger.error(
        {
          err: error,
          modelName: this.modelName,
        },
        'DeepSeek API call failed',
      );

      return {
        content: '',
        finishReason: 'error',
      };
    }
  }
}
