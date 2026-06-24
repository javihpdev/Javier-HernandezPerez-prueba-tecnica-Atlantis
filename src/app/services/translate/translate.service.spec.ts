import { TestBed } from '@angular/core/testing';
import { TranslateService } from './translate.service';
import { HttpClient } from "@angular/common/http";
import {of} from "rxjs";
import {TranslateService as NgxTranslateService} from "@ngx-translate/core";
describe('TranslateService', () => {
  let translateService: TranslateService;
  let ngxTranslateService: NgxTranslateService;
  let httpClientSpy: {get: jasmine.Spy};
  let ngxTranslateServiceSpy: {get: jasmine.Spy, instant: jasmine.Spy};

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    ngxTranslateServiceSpy = jasmine.createSpyObj('NgxTranslateService', ['get', 'instant', 'set']);

    TestBed.configureTestingModule({
      providers: [
        TranslateService,
        {provide: HttpClient, useValue: httpClientSpy},
        { provide: NgxTranslateService, useValue: ngxTranslateServiceSpy },
      ]
    });

    translateService = TestBed.inject(TranslateService);
    ngxTranslateService = TestBed.inject(NgxTranslateService);
  });

  it('deberia añadir las traducciones desde el fichero indicado', async () => {
    const mockTranslationData = {
      '_key1': 'Hola',
      '_key2': 'Adios'
    };

    httpClientSpy.get.and.returnValue(of(mockTranslationData));
    ngxTranslateServiceSpy.instant.and.returnValues('', '');
    await translateService.addTranslation('metas');
    expect(ngxTranslateService.set).toHaveBeenCalledTimes(2);
  });

  it('deberia añadir las traducciones desde el fichero indicado cuando es un objeto', async () => {
    const mockTranslationData = {
      'greeting': {
        'morning': 'Good morning'
      },
    };

    httpClientSpy.get.and.returnValue(of(mockTranslationData));
    ngxTranslateServiceSpy.instant.and.returnValues('', '', '', 'Good morning' );

    await translateService.addTranslation('file.json');
    expect(ngxTranslateService.set).toHaveBeenCalledTimes(1);
  });

  it('deberia comprobar si existe la traduccion', () => {
    ngxTranslateServiceSpy.instant.and.returnValue('Hello');
    const translationExists = translateService.hasTranslation('hello');
    expect(translationExists).toBeTrue();
  });

  it('deberia obtener la traducción', () => {
    ngxTranslateServiceSpy.instant.and.returnValue('Hello');
    const translation = ngxTranslateService.instant('hello');
    expect(translation).toEqual('Hello');
  });
});
