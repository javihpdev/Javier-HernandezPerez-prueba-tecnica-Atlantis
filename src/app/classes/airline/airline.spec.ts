import { Airline } from './airline';
import {fakeAirline} from "../../mocks/fAirline";

describe('Airline', () => {
  let airlineInstance: Airline;

  beforeEach(() => {
    airlineInstance = new Airline({...fakeAirline})
  })

  it('should create an instance', () => {
    expect(new Airline({...fakeAirline})).toBeTruthy();
  });

  it('should instantiate with correct code', () => {
    expect(airlineInstance!.code).toEqual("AB" )
  })

  it('should instantiate with correct name', () => {
    expect(airlineInstance!.name).toEqual("AIR BERLIN" )
  })
});
