import { Barber } from '@core/domain/entities/barber.entity';
import { AppointmentsRepository } from '@core/domain/repositories/appointments.repository';
import { Injectable } from '@nestjs/common';

interface CheckAppointmentAvailabilityInput {
  barber: Barber;
  date: Date;
  slot: string;
}

type CheckAppointmentAvailabilityOutput = boolean;

@Injectable()
export class CheckAppointmentAvailability {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  async execute(
    input: CheckAppointmentAvailabilityInput,
  ): Promise<CheckAppointmentAvailabilityOutput> {
    const appointmentsCount =
      await this.appointmentsRepository.countManyByAppointment(input);

    return appointmentsCount === 0;
  }
}
