import { Appointment } from '@core/domain/entities/appointment.entity';

export class AppointmentMapper {
  static toPersistence(appointment: Appointment) {
    return {
      clientEmail: appointment.user.email,
      clientName: appointment.user.name,
      date: appointment.date,
      id: appointment.id,
      slot: appointment.slot,
      barberId: appointment.barber.id,
    };
  }
}
