import { Appointment as RawAppointment } from '@prisma/client';
import { Appointment } from '@core/domain/entities/appointment.entity';
import { User } from '@core/domain/entities/user.entity';
import { Barber } from '@core/domain/entities/barber.entity';

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

  static toDomain(raw: RawAppointment, barber: Barber): Appointment {
    return new Appointment(
      {
        barber: barber,
        date: raw.date,
        slot: raw.slot,
        user: new User({
          email: raw.clientEmail,
          name: raw.clientName,
        }),
      },
      raw.id,
    );
  }
}
