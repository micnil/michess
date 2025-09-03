import { Sql } from 'postgres';
import { GameRepository } from './repository/GameRepository';
import { MoveRepository } from './repository/MoveRepository';
import { UserRepository } from './repository/UserRepository';

export type Repositories = {
  user: UserRepository;
  game: GameRepository;
  move: MoveRepository;
};

const from = (sql: Sql): Repositories => {
  return {
    user: new UserRepository(sql),
    game: new GameRepository(sql),
    move: new MoveRepository(sql),
  };
};

export const Repositories = {
  from,
};
