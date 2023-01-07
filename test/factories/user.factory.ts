import { User, UserProps } from '@core/domain/entities/user.entity';
import { Role } from '@shared/enums/role.enum';

type Override = Partial<UserProps>;

export function makeUser(override: Override = {}): User {
  return new User({
    name: 'Jane Doe',
    email: 'janedoe@email.com',
    password: '123456',
    role: Role.User,
    ...override,
  });
}
