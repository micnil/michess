import { eq } from 'drizzle-orm';
import { Maybe } from '@michess/common-utils';
import { BaseRepository } from './BaseRepository';
import { InsertUser } from '../model/InsertUser';
import { SelectUser } from '../model/SelectUser';
import { users } from '../schema';

export class UserRepository extends BaseRepository {
  async findUserById(id: string): Promise<Maybe<SelectUser>> {
    return this.db.query.users.findFirst({
      where: eq(this.schema.users.userId, id),
    });
  }

  async createUser(data: InsertUser): Promise<SelectUser> {
    const [user] = await this.insert('users').values(data).returning();
    return user;
  }

  async updateUser(id: string, data: InsertUser): Promise<Maybe<SelectUser>> {
    const [user] = await this.update('users')
      .set(data)
      .where(eq(this.schema.users.userId, id))
      .returning();
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    await this.db.delete(users).where(eq(this.schema.users.userId, id));
  }
}
