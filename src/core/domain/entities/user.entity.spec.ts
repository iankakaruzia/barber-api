import { Role } from '@shared/enums/role.enum';
import { User } from './user.entity';

describe('User Entity', () => {
  it('should be able to create an user', () => {
    const user = new User({
      email: 'janedoe@email.com',
      name: 'Jane Doe',
      password: '123456',
      role: Role.User,
      pictureUrl: 'https://example.com/picture.png',
    });

    expect(user).toBeInstanceOf(User);
    expect(user.name).toBe('Jane Doe');
  });
});
