import { Appointment } from '@core/domain/entities/appointment.entity';
import {
  AppointmentsRepository,
  FindManyByAppointmentArgs,
} from '@core/domain/repositories/appointments.repository';

export class InMemoryAppointmentsRepository implements AppointmentsRepository {
  public appointments: Appointment[] = [];

  async create(appointment: Appointment): Promise<void> {
    this.appointments.push(appointment);
  }

  async countManyByAppointment({
    barber,
    date,
    slot,
  }: FindManyByAppointmentArgs): Promise<number> {
    return this.appointments.filter(
      (appointment) =>
        appointment.barber.id === barber.id &&
        appointment.date.getTime() === date.getTime() &&
        appointment.slot === slot,
    ).length;
  }
}
