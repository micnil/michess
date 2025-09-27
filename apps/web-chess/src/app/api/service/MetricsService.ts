import { UsageMetricsV1 } from '@michess/api-schema';
import { RestClient } from '../infra/RestClient';
import { SocketClient } from '../infra/SocketClient';

export class MetricsService {
  constructor(
    private restClient: RestClient,
    private socketClient: SocketClient
  ) {}

  getUsage(): Promise<UsageMetricsV1> {
    console.log('Fetching usage metrics');
    return this.restClient.get<UsageMetricsV1>('metrics/usage').json();
  }
}
