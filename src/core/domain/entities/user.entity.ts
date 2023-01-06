import { Entity } from '@core/base/entity';

export interface UserProps {
  email: string;
  name: string;
}

export class User extends Entity {
  private props: UserProps;

  constructor(props: UserProps, id?: string) {
    super(id);
    this.props = props;
  }

  public get email() {
    return this.props.email;
  }

  public get name() {
    return this.props.name;
  }
}
