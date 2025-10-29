export type CreateGameInput = {
  realtime?: {
    initialSec: number;
    incrementSec: number;
  };
  correspondence?: {
    daysPerMove: number;
  };
  public: boolean;
};
