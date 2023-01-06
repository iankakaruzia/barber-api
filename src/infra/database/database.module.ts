import { AppointmentsRepository } from '@core/domain/repositories/appointments.repository';
import { BarbersRepository } from '@core/domain/repositories/barbers.repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAppointmentsRepository } from './prisma/repositories/prisma-appointments.repository';
import { PrismaBarbersRepository } from './prisma/repositories/prisma-barbers.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: BarbersRepository,
      useClass: PrismaBarbersRepository,
    },
    {
      provide: AppointmentsRepository,
      useClass: PrismaAppointmentsRepository,
    },
  ],
  exports: [BarbersRepository, AppointmentsRepository],
})
export class DatabaseModule {}
