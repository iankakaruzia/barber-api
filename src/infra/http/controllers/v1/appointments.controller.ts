import { CheckAppointmentAvailability } from '@application/use-cases/appointments/check-appointment-availability';
import { MakeAppointment } from '@application/use-cases/appointments/make-appointment';
import { GetBarberById } from '@application/use-cases/barbers/get-barber-by-id';
import { CreateAppointmentDto } from '@infra/http/dtos/create-appointment.dto';
import { AppointmentViewModel } from '@infra/http/view-models/appointment.view-model';
import { Body, ConflictException, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';

@Controller('v1/appointments')
export class AppointmentsController {
  constructor(
    private readonly getBarberById: GetBarberById,
    private readonly makeAppointment: MakeAppointment,
    private readonly checkAppointmentAvailability: CheckAppointmentAvailability,
  ) {}

  @Post()
  async create(@Body() createAppointmentDto: CreateAppointmentDto) {
    const { barber } = await this.getBarberById.execute(
      createAppointmentDto.barberId,
    );

    const date = new Date(createAppointmentDto.date);

    const isAvailable = await this.checkAppointmentAvailability.execute({
      barber,
      date,
      slot: createAppointmentDto.slot,
    });

    if (!isAvailable) {
      throw new ConflictException('Appointment not available');
    }

    const { appointment } = await this.makeAppointment.execute({
      barber,
      clientEmail: createAppointmentDto.clientEmail,
      clientName: createAppointmentDto.clientName,
      date,
      slot: createAppointmentDto.slot,
    });

    return {
      appointment: AppointmentViewModel.toHTTP(appointment),
    };
  }
}
