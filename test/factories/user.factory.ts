import { User, UserProps } from '@core/domain/entities/user.entity';

type Override = Partial<UserProps>;

export function makeUser(override: Override = {}): User {
  return new User({
    name: 'Jane Doe',
    email: 'janedoe@email.com',
    ...override,
  });
}
