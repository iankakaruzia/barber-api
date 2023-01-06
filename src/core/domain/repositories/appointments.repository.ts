import { Appointment } from '../entities/appointment.entity';

export abstract class AppointmentsRepository {
  abstract create(appointment: Appointment): Promise<void>;
}
