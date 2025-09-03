import { Sql } from 'postgres';
import { GameRepository } from './repository/GameRepository';
import { UserRepository } from './repository/UserRepository';

export type Repositories = {
  user: UserRepository;
  game: GameRepository;
};

const from = (sql: Sql): Repositories => {
  return {
    user: new UserRepository(sql),
    game: new GameRepository(sql),
  };
};

export const Repositories = {
  from,
};
