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

  async findManyByAppointment({
    barber,
    slot,
    date,
  }: FindManyByAppointmentArgs): Promise<Appointment[]> {
    const raw = await this.prisma.appointment.findMany({
      where: {
        barberId: barber.id,
        slot,
        date,
      },
    });

    return raw.map((appointment) =>
      AppointmentMapper.toDomain(appointment, barber),
    );
  }
}
