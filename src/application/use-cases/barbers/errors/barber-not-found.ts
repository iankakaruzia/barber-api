import { NotFoundException } from '@nestjs/common';

export class BarberNotFound extends NotFoundException {
  constructor() {
    super('Barber not found');
  }
}
