import {IUser} from "../../interfaces/iUser";

export class User implements IUser{
  private readonly _email: string;
  private readonly _name: string;

  constructor(iUser: IUser) {
    this._email = iUser.email;
    this._name = iUser.name;
  }

  get email(): string {
    return this._email;
  }

  get name(): string {
    return this._name;
  }
}
