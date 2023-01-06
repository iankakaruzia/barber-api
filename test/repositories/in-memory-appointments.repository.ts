import { Appointment } from '@core/domain/entities/appointment.entity';
import { AppointmentsRepository } from '@core/domain/repositories/appointments.repository';

export class InMemoryAppointmentsRepository implements AppointmentsRepository {
  public appointments: Appointment[] = [];

  async create(appointment: Appointment): Promise<void> {
    this.appointments.push(appointment);
  }
}
