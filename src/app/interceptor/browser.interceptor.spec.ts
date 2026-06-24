import { TestBed } from '@angular/core/testing';

import { BrowserInterceptor } from './browser.interceptor';

describe('BrowserInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BrowserInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: BrowserInterceptor = TestBed.inject(BrowserInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
