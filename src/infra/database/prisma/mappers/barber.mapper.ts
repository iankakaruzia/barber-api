import { Barber } from '@core/domain/entities/barber.entity';
import { Barber as RawBarber, Slot, WorkingDay } from '@prisma/client';

type FullRawBarber = RawBarber & {
  slots: Slot[];
  workingDays: WorkingDay[];
};

export class BarberMapper {
  static toPersistence(barber: Barber) {
    return {
      id: barber.id,
      name: barber.name,
      pictureUrl: barber.pictureUrl,
      slots: {
        create: barber.slots.map((slot) => ({
          barberId: barber.id,
          value: slot,
        })),
      },
      workingDays: {
        create: barber.workingDays.map((workingDay) => ({
          barberId: barber.id,
          day: workingDay,
        })),
      },
    };
  }

  static toDomain(raw: FullRawBarber): Barber {
    return new Barber(
      {
        name: raw.name,
        pictureUrl: raw.pictureUrl,
        slots: raw.slots.map((slot) => slot.value),
        workingDays: raw.workingDays.map((workingDay) => workingDay.day),
      },
      raw.id,
    );
  }
}
