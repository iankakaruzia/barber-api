import { Entity } from '@core/base/entity';
import { Role } from '@shared/enums/role.enum';
import { Replace } from '@shared/helpers/replace';

export interface UserProps {
  email: string;
  password: string;
  name: string;
  role: Role;
  pictureUrl?: string;
}

export class User extends Entity {
  private props: UserProps;

  constructor(props: Replace<UserProps, { role?: Role }>, id?: string) {
    super(id);
    this.props = {
      role: props.role ?? Role.User,
      ...props,
    };
  }

  public get email() {
    return this.props.email;
  }

  public get name() {
    return this.props.name;
  }

  public get role() {
    return this.props.role;
  }

  public get password() {
    return this.props.password;
  }

  public get pictureUrl() {
    return this.props.pictureUrl;
  }
}
