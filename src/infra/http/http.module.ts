import { CheckAppointmentAvailability } from '@application/use-cases/appointments/check-appointment-availability';
import { MakeAppointment } from '@application/use-cases/appointments/make-appointment';
import { AddBarber } from '@application/use-cases/barbers/add-barber';
import { GetBarberById } from '@application/use-cases/barbers/get-barber-by-id';
import { GetBarbers } from '@application/use-cases/barbers/get-barbers';
import { CreateUser } from '@application/use-cases/users/create-user';
import { GetUserByEmail } from '@application/use-cases/users/get-user-by-email';
import { CryptographyModule } from '@infra/cryptography/cryptography.module';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { LocalStrategy } from './auth/strategies/local.strategy';
import { AppointmentsController } from './controllers/v1/appointments.controller';
import { AuthController } from './controllers/v1/auth.controller';
import { BarbersController } from './controllers/v1/barbers.controller';

@Module({
  imports: [
    DatabaseModule,
    CryptographyModule,
    PassportModule,
    JwtModule.register({
      secret: 'super-secret-key',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [BarbersController, AppointmentsController, AuthController],
  providers: [
    GetBarbers,
    GetBarberById,
    MakeAppointment,
    CheckAppointmentAvailability,
    GetUserByEmail,
    CreateUser,
    AddBarber,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class HttpModule {}
