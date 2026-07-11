import type { JobsOptions } from 'bullmq';

export const BULLMQ_JOB_OPTIONS = {
  removeOnComplete: true,
  removeOnFail: {
    age: 7 * 24 * 60 * 60,
    count: 1000,
  },
} satisfies Pick<JobsOptions, 'removeOnComplete' | 'removeOnFail'>;
