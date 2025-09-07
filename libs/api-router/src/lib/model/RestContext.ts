import { Session } from '@michess/api-service';
import { Maybe } from '@michess/common-utils';

export type RestContext = {
  Variables: {
    session: Maybe<Session>;
  };
};
