import {IAirline} from "../../interfaces/iAirline";

export class Airline implements IAirline{
  private readonly _code: string = '';
  private readonly _name: string = '';

  constructor(iAirlines: IAirline) {
    this._code = iAirlines.code ?? '';
    this._name =  iAirlines.name ?? '';
  }

  get code(): string {
    return this._code;
  }

  get name(): string {
    return this._name;
  }
}
