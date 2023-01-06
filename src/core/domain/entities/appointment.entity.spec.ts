import { makeBarber } from '@test/factories/barber.factory';
import { makeUser } from '@test/factories/user.factory';
import { Appointment, AppointmentProps } from './appointment.entity';
import { Barber } from './barber.entity';
import { User } from './user.entity';

describe('Appointment Entity', () => {
  it('should be able to create an appointment', () => {
    const user = makeUser();
    const barber = makeBarber();
    const appointment = new Appointment({
      barber,
      user,
      date: new Date('01/02/2023'),
      slot: '09:00',
    });

    expect(appointment).toBeInstanceOf(Appointment);
    expect(appointment.slot).toBe('09:00');
    expect(appointment.barber).toBeInstanceOf(Barber);
    expect(appointment.user).toBeInstanceOf(User);
  });

  it('should not be able to create an appointment with invalid slot', () => {
    const user = makeUser();
    const barber = makeBarber({
      slots: ['10:00', '11:00'],
      workingDays: ['monday', 'tuesday', 'wednesday'],
    });
    const appointmentProps: AppointmentProps = {
      barber,
      user,
      date: new Date('01/02/2023'),
      slot: '09:00',
    };

    expect(() => new Appointment(appointmentProps)).toThrow();
  });

  it('should not be able to create an appointment with invalid working day', () => {
    const user = makeUser();
    const barber = makeBarber({
      slots: ['09:00', '10:00', '11:00'],
      workingDays: ['tuesday', 'wednesday'],
    });
    const appointmentProps: AppointmentProps = {
      barber,
      user,
      date: new Date('01/02/2023'),
      slot: '09:00',
    };

    expect(() => new Appointment(appointmentProps)).toThrow();
  });
});
