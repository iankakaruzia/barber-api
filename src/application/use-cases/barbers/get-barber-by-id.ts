import { Barber } from '@core/domain/entities/barber.entity';
import { BarbersRepository } from '@core/domain/repositories/barbers.repository';
import { Injectable } from '@nestjs/common';

interface GetBarberByIdOutput {
  barber: Barber | null;
}

@Injectable()
export class GetBarberById {
  constructor(private barbersRepository: BarbersRepository) {}

  async execute(id: string): Promise<GetBarberByIdOutput> {
    const barber = await this.barbersRepository.findById(id);

    return { barber };
  }
}
