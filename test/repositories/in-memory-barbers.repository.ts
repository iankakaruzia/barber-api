import { Barber } from '@core/domain/entities/barber.entity';
import { BarbersRepository } from '@core/domain/repositories/barbers.repository';

export class InMemoryBarbersRepository implements BarbersRepository {
  public barbers: Barber[] = [];

  create(barber: Barber): void {
    this.barbers.push(barber);
  }

  async findById(id: string): Promise<Barber | null> {
    const barber = this.barbers.find((barber) => barber.id === id);

    return barber ?? null;
  }

  async findMany(): Promise<Barber[]> {
    return this.barbers;
  }
}
