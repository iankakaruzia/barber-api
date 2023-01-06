import { randomUUID } from 'node:crypto';

export class Entity {
  private _id: string;

  constructor(id?: string) {
    this._id = id ?? randomUUID();
  }

  public get id() {
    return this._id;
  }
}
