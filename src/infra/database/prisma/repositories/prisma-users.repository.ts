import { User } from '@core/domain/entities/user.entity';
import { UsersRepository } from '@core/domain/repositories/users.repository';
import { Injectable } from '@nestjs/common';
import { UserMapper } from '../mappers/user.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return UserMapper.toDomain(user);
  }

  async create(user: User): Promise<void> {
    const raw = UserMapper.toPersistence(user);

    await this.prisma.user.create({
      data: raw,
    });
  }
}
