import { Session } from './Session';
import { User } from './User';

export type AuthState = {
  session: Session;
  user: User;
};
