import { makeBarber } from '@test/factories/barber.factory';
import { InMemoryBarbersRepository } from '@test/repositories/in-memory-barbers.repository';
import { GetBarbers } from './get-barbers';

describe('Get Barbers', () => {
  it('should be able to get barbers', async () => {
    const barbersRepository = new InMemoryBarbersRepository();
    const getBarbers = new GetBarbers(barbersRepository);

    barbersRepository.create(makeBarber());
    barbersRepository.create(
      makeBarber({
        name: 'Jane Doe',
      }),
    );

    const { barbers } = await getBarbers.execute();

    expect(barbers).toHaveLength(2);
    expect(barbers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'John Doe' }),
        expect.objectContaining({ name: 'Jane Doe' }),
      ]),
    );
  });
});
