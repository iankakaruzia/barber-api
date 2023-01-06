import { BarbersRepository } from '@core/domain/repositories/barbers.repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaBarbersRepository } from './prisma/repositories/prisma-barbers.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: BarbersRepository,
      useClass: PrismaBarbersRepository,
    },
  ],
  exports: [BarbersRepository],
})
export class DatabaseModule {}
