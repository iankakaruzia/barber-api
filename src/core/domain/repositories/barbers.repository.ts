import { Barber } from '../entities/barber.entity';

export abstract class BarbersRepository {
  abstract findById(id: string): Promise<Barber | null>;
  abstract findMany(): Promise<Barber[]>;
}
