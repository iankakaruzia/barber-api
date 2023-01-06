import { Barber } from '@core/domain/entities/barber.entity';
import { BarbersRepository } from '@core/domain/repositories/barbers.repository';
import { Injectable } from '@nestjs/common';
import { BarberNotFound } from './errors/barber-not-found';

interface GetBarberByIdOutput {
  barber: Barber;
}

@Injectable()
export class GetBarberById {
  constructor(private barbersRepository: BarbersRepository) {}

  async execute(id: string): Promise<GetBarberByIdOutput> {
    const barber = await this.barbersRepository.findById(id);

    if (!barber) {
      throw new BarberNotFound();
    }

    return { barber };
  }
}
