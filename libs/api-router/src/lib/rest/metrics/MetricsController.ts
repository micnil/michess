import { UsageMetricsService } from '@michess/api-service';
import { Hono } from 'hono';
import { RestContext } from '../../model/RestContext';

export const MetricsController = (
  metricsService: UsageMetricsService,
): Hono<RestContext> => {
  return new Hono<RestContext>().get('/usage', async (c) => {
    const response = await metricsService.getUsageMetrics();
    return c.json(response);
  });
};
