import { AddBarber } from '@application/use-cases/barbers/add-barber';
import { GetBarbers } from '@application/use-cases/barbers/get-barbers';
import { JwtAuthGuard } from '@infra/http/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@infra/http/auth/guards/roles.guard';
import { Roles } from '@infra/http/decorators/roles.decorator';
import { CreateBarberDto } from '@infra/http/dtos/create-barber.dto';
import { BarberViewModel } from '@infra/http/view-models/barber.view-model';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Role } from '@shared/enums/role.enum';

@UseGuards(JwtAuthGuard)
@Controller('v1/barbers')
export class BarbersController {
  constructor(
    private readonly getBarbers: GetBarbers,
    private readonly addBarber: AddBarber,
  ) {}

  @Get()
  async getAllBarbers() {
    const { barbers } = await this.getBarbers.execute();
    return { barbers: barbers.map(BarberViewModel.toHTTP) };
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async createBarber(@Body() createBarberDto: CreateBarberDto) {
    const { barber } = await this.addBarber.execute(createBarberDto);

    return { barber: BarberViewModel.toHTTP(barber) };
  }
}
