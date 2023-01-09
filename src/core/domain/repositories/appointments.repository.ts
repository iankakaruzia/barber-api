import { Appointment } from '../entities/appointment.entity';
import { Barber } from '../entities/barber.entity';

export interface FindManyByAppointmentArgs {
  barber: Barber;
  slot: string;
  date: Date;
}

export abstract class AppointmentsRepository {
  abstract create(appointment: Appointment): Promise<void>;
  abstract countManyByAppointment(
    args: FindManyByAppointmentArgs,
  ): Promise<number>;
}
