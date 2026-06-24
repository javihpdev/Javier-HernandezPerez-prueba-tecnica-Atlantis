import { TestBed } from '@angular/core/testing';

import { EnviromentService } from './enviroment.service';
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import {of} from "rxjs";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('EnviromentService', () => {
  let service: EnviromentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [EnviromentService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});

    service = TestBed.inject(EnviromentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#init', () => {
    it('should make an HTTP request and initialize the variables', (done) => {
      spyOn(service, 'load').and.returnValue(Promise.resolve());

      // call the function
      service.init().then(() => {
        expect(service.isInitializer).toBeTrue();
        done();
      });

    });
  });

  it('should have env as local and correct api url', () => {
    expect(service.environmentConfig.ENVIRONMENT).toEqual('local');
    expect(service.environmentConfig.API_URL).toEqual('http://127.0.0.1:8000');
  });

  it('should load configuration and update the environmentConfig', (done: DoneFn) => {
    const dummyResponse = {
      api: {
        environmentConfig: {
          ENVIRONMENT: 'test',
          API_URL: 'http://test.url'
        }
      }
    };

    service.load().then(() => {
      expect(service.environmentConfig).toEqual(dummyResponse.api.environmentConfig);
      done();
    });

    const req = httpMock.expectOne('/assets/config/config.json');
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('should throw error when unable to load config', (done: DoneFn) => {
    service.load().catch((err) => {
      expect(err).toBeTruthy();
      done();
    });

    const req = httpMock.expectOne('/assets/config/config.json');
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Network error'));
  });
});
