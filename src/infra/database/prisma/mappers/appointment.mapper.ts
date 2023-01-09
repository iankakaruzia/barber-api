import { Appointment } from '@core/domain/entities/appointment.entity';

export class AppointmentMapper {
  static toPersistence(appointment: Appointment) {
    return {
      userId: appointment.user.id,
      date: appointment.date,
      id: appointment.id,
      slot: appointment.slot,
      barberId: appointment.barber.id,
    };
  }
}
