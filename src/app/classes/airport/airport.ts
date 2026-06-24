import {IAirport} from "../../interfaces/iAirport";

export class Airport implements IAirport{
  private readonly _code: string = '';
  private readonly _name: string = '';
  private readonly _recessDate: string = '';
  private readonly _serviceDate: string = '';
  private readonly _courtesyDate: string = '';
  private readonly _international: boolean = false;
  private readonly _national: boolean = false;

  constructor(iAirport: IAirport) {
    this._code = iAirport.code ?? '';
    this._name = iAirport.name ?? '';
    this._recessDate = iAirport.recessDate ?? '';
    this._serviceDate = iAirport.serviceDate ?? '';
    this._courtesyDate = iAirport.courtesyDate ?? '';
    this._international = iAirport.international ?? false;
    this._national = iAirport.national ?? false;
  }

  get code(): string {
    return this._code;
  }

  get name(): string {
    return this._name;
  }

  get recessDate(): string {
    return this._recessDate;
  }

  get serviceDate(): string {
    return this._serviceDate;
  }

  get courtesyDate(): string {
    return this._courtesyDate;
  }

  get international(): boolean {
    return this._international;
  }

  get national(): boolean {
    return this._national;
  }
}
