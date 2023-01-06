import { Entity } from '@core/base/entity';

export interface BarberProps {
  name: string;
  pictureUrl: string;
  slots: string[];
  workingDays: string[];
}

export class Barber extends Entity {
  private props: BarberProps;

  constructor(props: BarberProps, id?: string) {
    super(id);
    this.props = props;
  }

  public get name() {
    return this.props.name;
  }

  public get pictureUrl() {
    return this.props.pictureUrl;
  }

  public get slots() {
    return this.props.slots;
  }

  public get workingDays() {
    return this.props.workingDays;
  }
}
