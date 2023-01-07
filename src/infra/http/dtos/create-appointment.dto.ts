import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateAppointmentDto {
  @IsUUID()
  barberId: string;

  @IsDateString()
  date: string;

  @IsString()
  @IsNotEmpty()
  slot: string;
}
