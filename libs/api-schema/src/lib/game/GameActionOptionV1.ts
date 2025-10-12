import { ColorV1 } from './ColorV1';
import { DrawReasonV1 } from './DrawReasonV1';

export type GameActionOptionV1 = { availableTo?: ColorV1 } & (
  | {
      type: 'offer_draw';
    }
  | {
      type: 'accept_draw';
      reason: DrawReasonV1;
    }
  | {
      type: 'resign';
    }
);
