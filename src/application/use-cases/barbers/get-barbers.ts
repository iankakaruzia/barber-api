import { Barber } from '@core/domain/entities/barber.entity';
import { BarbersRepository } from '@core/domain/repositories/barbers.repository';
import { Injectable } from '@nestjs/common';

interface GetBarbersOutput {
  barbers: Barber[];
}

@Injectable()
export class GetBarbers {
  constructor(private barbersRepository: BarbersRepository) {}

  async execute(): Promise<GetBarbersOutput> {
    const barbers = await this.barbersRepository.findMany();

    return { barbers };
  }
}
