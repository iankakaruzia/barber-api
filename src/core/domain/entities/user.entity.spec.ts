import { User } from './user.entity';

describe('User Entity', () => {
  it('should be able to create an user', () => {
    const user = new User({
      email: 'janedoe@email.com',
      name: 'Jane Doe',
    });

    expect(user).toBeInstanceOf(User);
    expect(user.name).toBe('Jane Doe');
  });
});
