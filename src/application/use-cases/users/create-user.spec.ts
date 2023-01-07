import { InMemoryUsersRepository } from '@test/repositories/in-memory-users.repository';
import { CreateUser } from './create-user';

describe('Create User', () => {
  it('should be able to create a user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUser = new CreateUser(usersRepository);

    const { user } = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
      pictureUrl: 'https://example.com/picture.png',
    });

    expect(user).toBeDefined();
    expect(usersRepository.users).toHaveLength(1);
    expect(usersRepository.users[0]).toEqual(user);
  });

  it('should throw if users repository throws', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUser = new CreateUser(usersRepository);

    jest.spyOn(usersRepository, 'create').mockImplementationOnce(() => {
      throw new Error('Users repository error');
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: '123456',
      }),
    ).rejects.toThrow('Users repository error');
  });
});
