import { NotFoundException } from '@nestjs/common';

export class BarberNotFoundException extends NotFoundException {
  constructor() {
    super('Barber not found');
  }
}
