import { Barber } from '@core/domain/entities/barber.entity';
import { BarbersRepository } from '@core/domain/repositories/barbers.repository';
import { Injectable } from '@nestjs/common';
import { BarberMapper } from '../mappers/barber.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaBarbersRepository implements BarbersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Barber | null> {
    const barber = await this.prisma.barber.findUnique({
      where: {
        id,
      },
      include: {
        slots: true,
        workingDays: true,
      },
    });

    if (!barber) {
      return null;
    }

    return BarberMapper.toDomain(barber);
  }

  async findMany(): Promise<Barber[]> {
    const barbers = await this.prisma.barber.findMany({
      include: {
        slots: true,
        workingDays: true,
      },
    });

    return barbers.map(BarberMapper.toDomain);
  }
}
