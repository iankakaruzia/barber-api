import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GetUserByEmail } from '@application/use-cases/users/get-user-by-email';
import { CryptographyProtocol } from '@core/protocols/cryptography.protocol';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly getUserByEmail: GetUserByEmail,
    private readonly cryptography: CryptographyProtocol,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const { user } = await this.getUserByEmail.execute(email);

    if (!user || !(await this.cryptography.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
