import { GetBarbers } from '@application/use-cases/barbers/get-barbers';
import { Controller, Get } from '@nestjs/common';

@Controller('v1/barbers')
export class BarbersController {
  constructor(private readonly getBarbers: GetBarbers) {}

  @Get()
  async getAllBarbers() {
    const { barbers } = await this.getBarbers.execute();
    return { barbers };
  }
}
