import { User } from '@core/domain/entities/user.entity';
import { UsersRepository } from '@core/domain/repositories/users.repository';
import { Injectable } from '@nestjs/common';

interface GetUserByEmailOutput {
  user: User | null;
}

@Injectable()
export class GetUserByEmail {
  constructor(private usersRepository: UsersRepository) {}

  async execute(email: string): Promise<GetUserByEmailOutput> {
    const user = await this.usersRepository.findByEmail(email);

    return { user };
  }
}
