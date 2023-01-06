import { Entity } from '@core/base/entity';
import { parseDayIndexToString } from '@shared/helpers/day';
import { InvalidAppointmentException } from '../errors/invalid-appointment.error';
import { Barber } from './barber.entity';
import { User } from './user.entity';

export interface AppointmentProps {
  barber: Barber;
  user: User;
  date: Date;
  slot: string;
}

export class Appointment extends Entity {
  private props: AppointmentProps;

  constructor(props: AppointmentProps, id?: string) {
    super(id);

    const isSlotValid = this.validateSlot(props.slot, props.barber);
    const isWorkingDay = this.validateWorkingDay(props.date, props.barber);

    if (!isSlotValid || !isWorkingDay) {
      throw new InvalidAppointmentException();
    }

    this.props = props;
  }

  public get barber() {
    return this.props.barber;
  }

  public get user() {
    return this.props.user;
  }

  public get date() {
    return this.props.date;
  }

  public get slot() {
    return this.props.slot;
  }

  private validateSlot(slot: string, barber: Barber): boolean {
    const isSlotValid = barber.slots.includes(slot);

    return isSlotValid;
  }

  private validateWorkingDay(date: Date, barber: Barber): boolean {
    const dayIndex = date.getDay();
    const dayString = parseDayIndexToString(dayIndex);

    const isWorkingDay = barber.workingDays.includes(dayString);

    return isWorkingDay;
  }
}
