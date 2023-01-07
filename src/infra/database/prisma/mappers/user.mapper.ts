import { User } from '@core/domain/entities/user.entity';
import { User as RawUser } from '@prisma/client';
import { Role } from '@shared/enums/role.enum';

export class UserMapper {
  static toPersistence(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      pictureUrl: user.pictureUrl,
      role: user.role,
    };
  }

  static toDomain(raw: RawUser): User {
    return new User(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        pictureUrl: raw.pictureUrl ?? undefined,
        role: raw.role === Role.Admin ? Role.Admin : Role.User,
      },
      raw.id,
    );
  }
}
