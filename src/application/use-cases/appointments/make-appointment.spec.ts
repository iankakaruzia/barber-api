import { makeBarber } from '@test/factories/barber.factory';
import { makeUser } from '@test/factories/user.factory';
import { InMemoryAppointmentsRepository } from '@test/repositories/in-memory-appointments.repository';
import { MakeAppointment } from './make-appointment';

describe('Make Appointment', () => {
  it('should be able to make an appointment', async () => {
    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const makeAppointment = new MakeAppointment(appointmentsRepository);

    const barber = makeBarber({
      slots: ['10:00', '11:00'],
      workingDays: ['monday', 'tuesday', 'wednesday'],
    });

    const { appointment } = await makeAppointment.execute({
      barber,
      date: new Date('01/02/2023'),
      user: makeUser(),
      slot: '10:00',
    });

    expect(appointment).toBeDefined();
    expect(appointmentsRepository.appointments).toHaveLength(1);
    expect(appointmentsRepository.appointments[0]).toEqual(appointment);
  });
});
