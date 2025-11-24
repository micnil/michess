import { Maybe } from '@michess/common-utils';

export type PlayerInfoIn = {
  id: string;
  name: Maybe<string>;
  role: Maybe<string>;
};
