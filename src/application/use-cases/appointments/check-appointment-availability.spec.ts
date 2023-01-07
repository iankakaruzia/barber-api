import { Appointment } from '@core/domain/entities/appointment.entity';
import { makeBarber } from '@test/factories/barber.factory';
import { makeUser } from '@test/factories/user.factory';
import { InMemoryAppointmentsRepository } from '@test/repositories/in-memory-appointments.repository';
import { CheckAppointmentAvailability } from './check-appointment-availability';

describe('Check Appointment Availability', () => {
  it('should return true if appointment slot is free', async () => {
    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const checkAppointmentAvailability = new CheckAppointmentAvailability(
      appointmentsRepository,
    );

    const barber = makeBarber({
      slots: ['10:00', '11:00'],
      workingDays: ['monday', 'tuesday', 'wednesday'],
    });

    const isAvailable = await checkAppointmentAvailability.execute({
      barber,
      date: new Date('01/02/2023'),
      slot: '10:00',
    });

    expect(isAvailable).toBe(true);
  });

  it('should return false if appointment slot is not free', async () => {
    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const checkAppointmentAvailability = new CheckAppointmentAvailability(
      appointmentsRepository,
    );

    const barber = makeBarber({
      slots: ['10:00', '11:00'],
      workingDays: ['monday', 'tuesday', 'wednesday'],
    });

    appointmentsRepository.create(
      new Appointment({
        barber,
        date: new Date('01/02/2023'),
        slot: '10:00',
        user: makeUser(),
      }),
    );

    await checkAppointmentAvailability.execute({
      barber,
      date: new Date('01/02/2023'),
      slot: '10:00',
    });

    const isAvailable = await checkAppointmentAvailability.execute({
      barber,
      date: new Date('01/02/2023'),
      slot: '10:00',
    });

    expect(isAvailable).toBe(false);
  });
});
