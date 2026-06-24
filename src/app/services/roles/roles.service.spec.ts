import { TestBed } from '@angular/core/testing';
import { RolesService } from './roles.service';
import { CookieService } from '../cookie/cookie.service';
import { Roles } from '../../enums/roles.enum';

describe('RolesService', () => {
  let service: RolesService;
  let cookieServiceSpy: jasmine.SpyObj<CookieService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('CookieService', ['getCookie']);

    TestBed.configureTestingModule({
      providers: [
        RolesService,
        { provide: CookieService, useValue: spy }
      ]
    });

    service = TestBed.inject(RolesService);
    cookieServiceSpy = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true if user role is in allowed roles', () => {
    cookieServiceSpy.getCookie.and.returnValue(Roles.ADMIN);
    expect(service.isAllowed([Roles.ADMIN, Roles.OPERATOR])).toBeTrue();
  });

  it('should return false if user role is not in allowed roles', () => {
    cookieServiceSpy.getCookie.and.returnValue(Roles.READER);
    expect(service.isAllowed([Roles.ADMIN, Roles.OPERATOR])).toBeFalse();
  });

  it('should return false if user role is undefined', () => {
    cookieServiceSpy.getCookie.and.returnValue(undefined);
    expect(service.isAllowed([Roles.ADMIN, Roles.OPERATOR])).toBeFalse();
  });
});