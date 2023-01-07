import { User } from '@core/domain/entities/user.entity';
import { CryptographyProtocol } from '@core/protocols/cryptography.protocol';
import { CreateUser } from '@application/use-cases/users/create-user';
import { CurrentUser } from '@infra/http/auth/decorators/current-user.decorator';
import { LocalAuthGuard } from '@infra/http/auth/guards/local.guard';
import { JwtPayload } from '@infra/http/auth/interfaces/jwt-payload.interface';
import { CreateUserDto } from '@infra/http/dtos/create-user.dto';
import { UserViewModel } from '@infra/http/view-models/user.view-model';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Controller('v1/auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly createUser: CreateUser,
    private readonly cryptography: CryptographyProtocol,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: User) {
    const payload: JwtPayload = { email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return UserViewModel.toHTTP(user, accessToken);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const hashedPassword = await this.cryptography.hash(createUserDto.password);

    const { user } = await this.createUser.execute({
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
      pictureUrl: createUserDto.pictureUrl,
    });

    const payload: JwtPayload = { email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return UserViewModel.toHTTP(user, accessToken);
  }
}
