import { Appointment } from '@core/domain/entities/appointment.entity';

export class AppointmentViewModel {
  static toHTTP(appointment: Appointment) {
    return {
      id: appointment.id,
      barber: {
        name: appointment.barber.name,
      },
      clientName: appointment.user.name,
      clientEmail: appointment.user.email,
      date: appointment.date,
      slot: appointment.slot,
    };
  }
}
