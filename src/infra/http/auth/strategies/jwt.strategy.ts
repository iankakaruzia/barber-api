import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { GetUserByEmail } from '@application/use-cases/users/get-user-by-email';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly getUserByEmail: GetUserByEmail) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'super-secret-key',
    });
  }

  async validate({ email }: JwtPayload) {
    const { user } = await this.getUserByEmail.execute(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
