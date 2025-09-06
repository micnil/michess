import { Sql } from 'postgres';
import { RedisClientType } from 'redis';
import { CacheRepository } from './repository/CacheRepository';
import { GameRepository } from './repository/GameRepository';
import { MoveRepository } from './repository/MoveRepository';
import { UserRepository } from './repository/UserRepository';

export type Repositories = {
  user: UserRepository;
  game: GameRepository;
  move: MoveRepository;
  cache: CacheRepository;
};

const from = (sql: Sql, redis: RedisClientType): Repositories => {
  return {
    user: new UserRepository(sql),
    game: new GameRepository(sql),
    move: new MoveRepository(sql),
    cache: new CacheRepository(redis),
  };
};

export const Repositories = {
  from,
};
