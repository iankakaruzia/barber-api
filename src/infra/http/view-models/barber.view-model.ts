import { Barber } from '@core/domain/entities/barber.entity';

export class BarberViewModel {
  static toHTTP(barber: Barber) {
    return {
      id: barber.id,
      name: barber.name,
      pictureUrl: barber.pictureUrl,
      slots: barber.slots,
      workingDays: barber.workingDays,
    };
  }
}
