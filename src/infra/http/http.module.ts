import { GetBarbers } from '@application/use-cases/barbers/get-barbers';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { BarbersController } from './controllers/v1/barbers.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [BarbersController],
  providers: [GetBarbers],
})
export class HttpModule {}
