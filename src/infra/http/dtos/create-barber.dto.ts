import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBarberDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  pictureUrl: string;

  @IsString({ each: true })
  slots: string[];

  @IsString({ each: true })
  workingDays: string[];
}
