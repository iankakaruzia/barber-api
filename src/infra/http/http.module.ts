import { CheckAppointmentAvailability } from '@application/use-cases/appointments/check-appointment-availability';
import { MakeAppointment } from '@application/use-cases/appointments/make-appointment';
import { GetBarberById } from '@application/use-cases/barbers/get-barber-by-id';
import { GetBarbers } from '@application/use-cases/barbers/get-barbers';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AppointmentsController } from './controllers/v1/appointments.controller';
import { BarbersController } from './controllers/v1/barbers.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [BarbersController, AppointmentsController],
  providers: [
    GetBarbers,
    GetBarberById,
    MakeAppointment,
    CheckAppointmentAvailability,
  ],
})
export class HttpModule {}
