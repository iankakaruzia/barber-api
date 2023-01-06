import { makeBarber } from '@test/factories/barber.factory';
import { InMemoryBarbersRepository } from '@test/repositories/in-memory-barbers.repository';
import { GetBarberById } from './get-barber-by-id';

describe('Get Barber By ID', () => {
  it('should be able to get a barber', async () => {
    const barbersRepository = new InMemoryBarbersRepository();
    const getBarberById = new GetBarberById(barbersRepository);

    const barberMock = makeBarber();

    barbersRepository.create(barberMock);

    const { barber } = await getBarberById.execute(barberMock.id);

    expect(barber).toEqual(barberMock);
  });
});
