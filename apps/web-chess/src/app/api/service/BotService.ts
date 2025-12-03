import { BotInfoV1 } from '@michess/api-schema';
import { RestClient } from '../infra/RestClient';

export class BotService {
  constructor(private restClient: RestClient) {}

  async listBots(): Promise<BotInfoV1[]> {
    return this.restClient.get('bots').json();
  }
}
