import { Appointment } from '@core/domain/entities/appointment.entity';
import {
  AppointmentsRepository,
  FindManyByAppointmentArgs,
} from '@core/domain/repositories/appointments.repository';
import { Injectable } from '@nestjs/common';
import { AppointmentMapper } from '../mappers/appointment.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaAppointmentsRepository implements AppointmentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(appointment: Appointment): Promise<void> {
    const raw = AppointmentMapper.toPersistence(appointment);

    await this.prisma.appointment.create({
      data: raw,
    });
  }

  async countManyByAppointment({
    barber,
    slot,
    date,
  }: FindManyByAppointmentArgs): Promise<number> {
    const appointmentsCount = await this.prisma.appointment.count({
      where: {
        barberId: barber.id,
        slot,
        date,
      },
    });

    return appointmentsCount;
  }
}
