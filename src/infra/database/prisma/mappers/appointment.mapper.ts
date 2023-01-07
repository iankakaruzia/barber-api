import { Appointment as RawAppointment, User as RawUser } from '@prisma/client';
import { Appointment } from '@core/domain/entities/appointment.entity';
import { Barber } from '@core/domain/entities/barber.entity';
import { UserMapper } from './user.mapper';

interface FullRawAppointment extends RawAppointment {
  user: RawUser;
}

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

  static toDomain(raw: FullRawAppointment, barber: Barber): Appointment {
    return new Appointment(
      {
        barber: barber,
        user: UserMapper.toDomain(raw.user),
        date: raw.date,
        slot: raw.slot,
      },
      raw.id,
    );
  }
}
