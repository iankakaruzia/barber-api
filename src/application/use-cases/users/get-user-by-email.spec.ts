import { User } from '@core/domain/entities/user.entity';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users.repository';
import { GetUserByEmail } from './get-user-by-email';

describe('Get User By Email', () => {
  it('should be able to get a user by email', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const getUserByEmail = new GetUserByEmail(usersRepository);

    await usersRepository.create(
      new User({
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: '123456',
      }),
    );

    const { user } = await getUserByEmail.execute('johndoe@email.com');

    expect(user).toBeDefined();
    expect(usersRepository.users).toHaveLength(1);
    expect(usersRepository.users[0]).toEqual(user);
  });

  it('should return null if user does not exist', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const getUserByEmail = new GetUserByEmail(usersRepository);

    const { user } = await getUserByEmail.execute('non-existing-email');

    expect(user).toBeNull();
  });
});
