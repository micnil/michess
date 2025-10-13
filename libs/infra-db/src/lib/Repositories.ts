import Redis from 'ioredis';
import { Sql } from 'postgres';
import { ActionRepository } from './repository/ActionRepository';
import { CacheRepository } from './repository/CacheRepository';
import { GameRepository } from './repository/GameRepository';
import { MoveRepository } from './repository/MoveRepository';
import { UserRepository } from './repository/UserRepository';

export type Repositories = {
  user: UserRepository;
  game: GameRepository;
  move: MoveRepository;
  action: ActionRepository;
  cache: CacheRepository;
};

const from = (sql: Sql, redis: Redis): Repositories => {
  return {
    user: new UserRepository(sql),
    game: new GameRepository(sql),
    move: new MoveRepository(sql),
    action: new ActionRepository(sql),
    cache: new CacheRepository(redis),
  };
};

export const Repositories = {
  from,
};
