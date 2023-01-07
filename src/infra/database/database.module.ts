import { AppointmentsRepository } from '@core/domain/repositories/appointments.repository';
import { BarbersRepository } from '@core/domain/repositories/barbers.repository';
import { UsersRepository } from '@core/domain/repositories/users.repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAppointmentsRepository } from './prisma/repositories/prisma-appointments.repository';
import { PrismaBarbersRepository } from './prisma/repositories/prisma-barbers.repository';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users.repository';

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
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [BarbersRepository, AppointmentsRepository, UsersRepository],
})
export class DatabaseModule {}
