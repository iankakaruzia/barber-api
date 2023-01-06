import { BadRequestException } from '@nestjs/common';

export class InvalidAppointmentException extends BadRequestException {
  constructor() {
    super('Invalid appointment');
  }
}
