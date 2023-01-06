import { Barber } from '@core/domain/entities/barber.entity';
import { Barber as RawBarber, Slot, WorkingDay } from '@prisma/client';

type FullRawBarber = RawBarber & {
  slots: Slot[];
  workingDays: WorkingDay[];
};

export class BarberMapper {
  static toDomain(raw: FullRawBarber): Barber {
    return new Barber({
      name: raw.name,
      pictureUrl: raw.pictureUrl,
      slots: raw.slots.map((slot) => slot.value),
      workingDays: raw.workingDays.map((workingDay) => workingDay.day),
    });
  }
}
