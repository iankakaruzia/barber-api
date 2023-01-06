import { Barber, BarberProps } from '@core/domain/entities/barber.entity';

type Override = Partial<BarberProps>;

export function makeBarber(override: Override = {}): Barber {
  return new Barber({
    name: 'John Doe',
    pictureUrl: 'https://example.com',
    slots: ['09:00', '10:00', '11:00'],
    workingDays: ['monday', 'tuesday', 'wednesday'],
    ...override,
  });
}
