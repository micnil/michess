import { Maybe } from '@michess/common-utils';

export type User = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image: Maybe<string>;
  isAnonymous: boolean;
};
