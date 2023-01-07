import { User } from '@core/domain/entities/user.entity';
import { UsersRepository } from '@core/domain/repositories/users.repository';
import { Injectable } from '@nestjs/common';

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  pictureUrl?: string;
}

interface CreateUserOutput {
  user: User;
}

@Injectable()
export class CreateUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const user = new User(input);
    await this.usersRepository.create(user);

    return { user };
  }
}
