import { Barber } from '@core/domain/entities/barber.entity';
import { InMemoryBarbersRepository } from '@test/repositories/in-memory-barbers.repository';
import { AddBarber } from './add-barber';

describe('Add Barber', () => {
  it('should be able to add a new barber', async () => {
    const barbersRepository = new InMemoryBarbersRepository();
    const addBarber = new AddBarber(barbersRepository);

    const input = {
      name: 'John Doe',
      pictureUrl: 'https://example.com/picture.jpg',
      slots: ['09:00', '10:00', '11:00'],
      workingDays: ['monday', 'tuesday', 'wednesday'],
    };

    const { barber } = await addBarber.execute(input);

    expect(barber).toBeInstanceOf(Barber);
    expect(barbersRepository.barbers[0]).toEqual(barber);
  });
});
