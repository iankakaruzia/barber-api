import { CheckAppointmentAvailability } from '@application/use-cases/appointments/check-appointment-availability';
import { MakeAppointment } from '@application/use-cases/appointments/make-appointment';
import { GetBarberById } from '@application/use-cases/barbers/get-barber-by-id';
import { User } from '@core/domain/entities/user.entity';
import { CurrentUser } from '@infra/http/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '@infra/http/auth/guards/jwt-auth.guard';
import { CreateAppointmentDto } from '@infra/http/dtos/create-appointment.dto';
import { AppointmentViewModel } from '@infra/http/view-models/appointment.view-model';
import { Body, ConflictException, Post, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';

@UseGuards(JwtAuthGuard)
@Controller('v1/appointments')
export class AppointmentsController {
  constructor(
    private readonly getBarberById: GetBarberById,
    private readonly makeAppointment: MakeAppointment,
    private readonly checkAppointmentAvailability: CheckAppointmentAvailability,
  ) {}

  @Post()
  async create(
    @Body() createAppointmentDto: CreateAppointmentDto,
    @CurrentUser() user: User,
  ) {
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
      user,
      date,
      slot: createAppointmentDto.slot,
    });

    return {
      appointment: AppointmentViewModel.toHTTP(appointment),
    };
  }
}
