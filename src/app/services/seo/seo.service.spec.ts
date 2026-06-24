import { TestBed } from '@angular/core/testing';
import { SeoService } from './seo.service';
import {TranslateService as NgxTranslateService} from "@ngx-translate/core";
import {TranslateService} from "../translate/translate.service";
import {NavigationEnd, Router} from "@angular/router";
import {Meta, Title} from "@angular/platform-browser";
import {of} from "rxjs";

describe('SeoService', () => {
  let service: SeoService;
  beforeEach(() => {
    const translateServiceStub = { get: (key: any) => of(key), addTranslation: (key: any) => of(key), hasTranslation: (key: any) => true, instant: (key: any) => key }
    const ngxTranslateServiceStub = { get: (key: any) => of(key), currentLang: 'es' , instant: (key: any) => key };
    const routerStub = { url: '/es/test/path', events: of(new NavigationEnd(0, '/es/url1', '/es/url2')), navigate: (path: any) => of(true) };
    const metaStub = { updateTag: (tag: any) => tag };
    const titleStub = { setTitle: (title: any) => title };

    TestBed.configureTestingModule({
      providers: [
        SeoService,
        { provide: TranslateService, useValue: translateServiceStub },
        { provide: NgxTranslateService, useValue: ngxTranslateServiceStub },
        { provide: Router, useValue: routerStub },
        { provide: Meta, useValue: metaStub },
        { provide: Title, useValue: titleStub },
      ],
      teardown: { destroyAfterEach: false }
    });
    service = TestBed.inject(SeoService);
    TestBed.inject(TranslateService);
    TestBed.inject(NgxTranslateService);
    TestBed.inject(Router);
    TestBed.inject(Meta);
    TestBed.inject(Title);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#load should return a promise that resolves to true', async () => {
    const loadSpy = spyOn(service, 'load').and.callThrough();

    service.load().then(result => {
      expect(result).toBe(true);
    });

    expect(loadSpy).toHaveBeenCalled();
  });

  it('#load should return a promise that resolves to true with alternates', async () => {
    const loadSpy = spyOn(service, 'load').and.callThrough();
    spyOn(<any>service, '_addAlternate').and.returnValue(true);
    service.load().then(result => {
      expect(result).toBe(true);
    });

    expect(loadSpy).toHaveBeenCalled();
  });

});
