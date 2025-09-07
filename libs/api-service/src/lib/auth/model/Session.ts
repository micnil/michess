import { Maybe } from '@michess/common-utils';

export type Session = {
  userId: string;
  sessionId: string;
  token: string;
  expiresAt: Date;
  userAgent: Maybe<string>;
  ipAddress: Maybe<string>;
  isAnonymous: boolean;
};
