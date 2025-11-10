import { InferResultType } from './InferResultType';

export type SelectGameWithRelations = InferResultType<
  'games',
  {
    moves: true;
    whitePlayer: true;
    blackPlayer: true;
    actions: true;
    whiteRating: true;
    blackRating: true;
  }
>;
