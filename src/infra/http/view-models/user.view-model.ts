import { User } from '@core/domain/entities/user.entity';

export class UserViewModel {
  static toHTTP(user: User, accessToken: string) {
    return {
      accessToken,
      user: {
        name: user.name,
        email: user.email,
        pictureUrl: user.pictureUrl,
      },
    };
  }
}
