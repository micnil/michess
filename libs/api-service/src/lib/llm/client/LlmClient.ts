import { LlmResponse } from '../model/LlmMessage';
import { LlmRequest } from '../model/LlmRequest';

export interface LlmClient {
  generateResponse(request: LlmRequest): Promise<LlmResponse>;
}
