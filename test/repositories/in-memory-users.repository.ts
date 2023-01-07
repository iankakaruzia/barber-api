import { User } from '@core/domain/entities/user.entity';
import { UsersRepository } from '@core/domain/repositories/users.repository';

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);

    return user ?? null;
  }

  async create(user: User): Promise<void> {
    this.users.push(user);
  }
}
