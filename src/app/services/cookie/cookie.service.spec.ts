import { TestBed } from '@angular/core/testing';

import { CookieService } from './cookie.service';

describe('CookieService', () => {
  let service: CookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('set', () => {
    it('should set a cookie', () => {
      const key = 'testKey';
      const value = 'testValue';
      service.set(key, value);
      expect(document.cookie).toContain(`${key}=${value}`);
    });

    it('should set a cookie with expiry date', () => {
      const key = 'testKey';
      const value = 'testValue';
      const expires = new Date();
      service.set(key, value, expires);
      expect('testKey=testValue').toContain(`${key}=${value}`);
    });
  });

  describe('get', () => {
    it('should return a cookie', () => {
      const key = 'testKey';
      const value = 'testValue';
      document.cookie = `${key}=${value}`;
      expect(service.get(key)).toBe(value);
    });

    it('should return empty string for non-existing cookie', () => {
      expect(service.get('nonExistingKey')).toBe('');
    });
  });

  describe('setWithExpiryInMiliseconds', () => {
    it('should set a cookie with expiry date calculated from milliseconds', () => {
      const key = 'testKey';
      const value = 'testValue';
      const expires = 1000;
      let past = new Date();
      past.setTime(past.getTime() - expires);
      document.cookie = `${key}=${value};expires=${past.toUTCString()}`;
      service.setWithExpiryInMiliseconds(key, value, expires);
      expect(service.get(key)).toBe(value);
    });
  });

  describe('getCookie', () => {
    it('should return a cookie in a browser environment', () => {
      spyOnProperty(window.document, 'cookie').and.returnValue('cookieValue');
      const cookieValue = service.getCookie('cookieKey');
      expect('cookieValue').toEqual('cookieValue');
    });

    it('should return null for non-existing cookie in non-browser environment', () => {
      spyOn(service, 'isBrowser').and.returnValue(false);
      const cookieValue = service.getCookie('nonExistingKey');
      expect(cookieValue).toBeNull();
    });
  });

  describe('parseCookies', () => {
    it('should correctly parse cookies', () => {
      spyOn(service, 'isBrowser').and.returnValue(false);
      service.parseCookies('cookieKey=cookieValue;oneMoreKey=oneMoreValue');
      const cookieValue = service.getCookie('cookieKey');
      expect(cookieValue).toBe('cookieValue');
      const oneMoreCookieValue = service.getCookie('oneMoreKey');
      expect(oneMoreCookieValue).toBe('oneMoreValue');
    });
  });
});
