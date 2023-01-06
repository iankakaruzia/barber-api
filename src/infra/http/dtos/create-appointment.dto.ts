import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateAppointmentDto {
  @IsUUID()
  barberId: string;

  @IsDateString()
  date: string;

  @IsString()
  @IsNotEmpty()
  slot: string;

  @IsString()
  @IsNotEmpty()
  clientName: string;

  @IsEmail()
  clientEmail: string;
}
