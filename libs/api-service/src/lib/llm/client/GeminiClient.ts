import { GoogleGenAI } from '@google/genai';
import { logger } from '@michess/be-utils';
import { LlmResponse } from '../model/LlmMessage';
import { LlmRequest } from '../model/LlmRequest';
import { LlmClient } from './LlmClient';

export class GeminiClient implements LlmClient {
  private client: GoogleGenAI;

  constructor(
    apiKey: string,
    private readonly modelName: string,
  ) {
    this.client = new GoogleGenAI({ apiKey });
  }

  async generateResponse(request: LlmRequest): Promise<LlmResponse> {
    try {
      const result = await this.client.models.generateContent({
        model: this.modelName,
        contents: request.userPrompt,
        config: {
          systemInstruction: request.systemPrompt,
          temperature: request.temperature,
        },
      });

      const text = result.text ?? '';

      logger.debug(
        {
          modelName: this.modelName,
          promptLength: request.userPrompt.length,
          responseLength: text.length,
        },
        'Gemini API call successful',
      );

      return {
        content: text,
        finishReason: 'stop',
      };
    } catch (error) {
      logger.error(
        {
          error,
          modelName: this.modelName,
        },
        'Gemini API call failed',
      );

      return {
        content: '',
        finishReason: 'error',
      };
    }
  }
}
