import { Maybe } from '@michess/common-utils';
import { eq } from 'drizzle-orm';
import { InsertUser } from '../model/InsertUser';
import { SelectUser } from '../model/SelectUser';
import { users } from '../schema';
import { BaseRepository } from './BaseRepository';

export class UserRepository extends BaseRepository {
  async findUserById(id: string): Promise<Maybe<SelectUser>> {
    return this.db.query.users.findFirst({
      where: eq(this.schema.users.id, id),
    });
  }

  async createUser(data: InsertUser): Promise<SelectUser> {
    const [user] = await this.db.insert(users).values(data).returning();
    return user;
  }

  async updateUser(id: string, data: InsertUser): Promise<Maybe<SelectUser>> {
    const [user] = await this.db
      .update(users)
      .set(data)
      .where(eq(this.schema.users.id, id))
      .returning();
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    await this.db.delete(users).where(eq(this.schema.users.id, id));
  }

  async listBots(): Promise<SelectUser[]> {
    return this.db.query.users.findMany({
      where: eq(this.schema.users.role, 'bot'),
    });
  }
}
