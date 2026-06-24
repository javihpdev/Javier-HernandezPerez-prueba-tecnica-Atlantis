import { Airport } from './airport';
import {fakeAirport} from "../../mocks/fAirport";

describe('Airport', () => {

  let airport: Airport;

  beforeEach(() => {
    airport = new Airport({...fakeAirport});
  });


  it('should create an instance', () => {
    expect(airport).toBeTruthy();
  });


  it('should get correct code', () => {
    const result = airport.code;
    expect(result).toEqual('');
  });

  it('should get correct name', () => {
    const result = airport.name;
    expect(result).toEqual('');
  });

  it('should get correct recessDate', () => {
    const result = airport.recessDate;
    expect(result).toEqual('');
  });

  it('should get correct serviceDate', () => {
    const result = airport.serviceDate;
    expect(result).toEqual('');
  });

  it('should get correct courtesyDate', () => {
    const result = airport.courtesyDate;
    expect(result).toEqual('');
  });

  it('should get correct international status', () => {
    const result = airport.international;
    expect(result).toEqual(false);
  });

  it('should get correct national status', () => {
    const result = airport.national;
    expect(result).toEqual(false);
  });

});
