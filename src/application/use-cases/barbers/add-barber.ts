import { Barber } from '@core/domain/entities/barber.entity';
import { BarbersRepository } from '@core/domain/repositories/barbers.repository';
import { Injectable } from '@nestjs/common';

interface AddBarberInput {
  name: string;
  pictureUrl: string;
  slots: string[];
  workingDays: string[];
}

interface AddBarberOutput {
  barber: Barber;
}

@Injectable()
export class AddBarber {
  constructor(private barbersRepository: BarbersRepository) {}

  async execute(input: AddBarberInput): Promise<AddBarberOutput> {
    const barber = new Barber(input);

    await this.barbersRepository.create(barber);

    return { barber };
  }
}
