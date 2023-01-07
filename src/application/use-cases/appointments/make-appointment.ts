import { Appointment } from '@core/domain/entities/appointment.entity';
import { Barber } from '@core/domain/entities/barber.entity';
import { User } from '@core/domain/entities/user.entity';
import { AppointmentsRepository } from '@core/domain/repositories/appointments.repository';
import { Injectable } from '@nestjs/common';

interface MakeAppointmentInput {
  barber: Barber;
  user: User;
  date: Date;
  slot: string;
}

interface MakeAppointmentOutput {
  appointment: Appointment;
}

@Injectable()
export class MakeAppointment {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  async execute({
    barber,
    date,
    user,
    slot,
  }: MakeAppointmentInput): Promise<MakeAppointmentOutput> {
    const appointment = new Appointment({
      barber,
      date,
      user,
      slot,
    });

    await this.appointmentsRepository.create(appointment);

    return { appointment };
  }
}
