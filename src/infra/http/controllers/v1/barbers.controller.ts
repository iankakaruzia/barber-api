import { GetBarbers } from '@application/use-cases/barbers/get-barbers';
import { JwtAuthGuard } from '@infra/http/auth/guards/jwt-auth.guard';
import { BarberViewModel } from '@infra/http/view-models/barber.view-model';
import { Controller, Get, UseGuards } from '@nestjs/common';

@UseGuards(JwtAuthGuard)
@Controller('v1/barbers')
export class BarbersController {
  constructor(private readonly getBarbers: GetBarbers) {}

  @Get()
  async getAllBarbers() {
    const { barbers } = await this.getBarbers.execute();
    return { barbers: barbers.map(BarberViewModel.toHTTP) };
  }
}
