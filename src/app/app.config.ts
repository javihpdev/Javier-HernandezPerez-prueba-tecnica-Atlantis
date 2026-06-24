import {APP_INITIALIZER, ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter, withDisabledInitialNavigation} from '@angular/router';

import { routes } from './app.routes';
//import { provideClientHydration } from '@angular/platform-browser';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {
  LocalizeParser,
  LocalizeRouterModule,
  LocalizeRouterSettings, ManualParserLoader,
  withLocalizeRouter
} from "@gilsdav/ngx-translate-router";
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withFetch } from "@angular/common/http";
import {Location} from '@angular/common';
import packageJson from '@package';
import {locales} from "@locales";
import {SeoService} from "./services/seo/seo.service";
import {EnviromentService} from "./services/enviroment/enviroment.service";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {GraphQLModule} from "./graphql.module";
import { BrowserInterceptor } from './interceptor/browser.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    //provideRouter(routes),
    //provideClientHydration(),
    provideHttpClient(withFetch()),
    importProvidersFrom([
      LocalizeRouterModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient) => {
            return new TranslateHttpLoader(http, `./assets/i18n/`, '.json?v='+ packageJson.version)
          },
          deps: [HttpClient],
        }
      }),
      GraphQLModule
    ]),
    provideRouter(
      routes,
      withDisabledInitialNavigation(),
      withLocalizeRouter(routes, {
        parser: {
          provide: LocalizeParser,
          useFactory: (translate: TranslateService, location: Location, settings: LocalizeRouterSettings) =>
            new ManualParserLoader(translate, location, settings, locales, 'routes.'),
          deps: [TranslateService, Location, LocalizeRouterSettings]
        },
        initialNavigation: true
      })
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: (seoService: SeoService) => async () => { await seoService.load() },
      deps: [SeoService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (enviromentService: EnviromentService) => async () => {
        await enviromentService.init();
      },
      deps: [EnviromentService],
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: BrowserInterceptor, multi: true },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'es'
    },
    provideAnimationsAsync('noop')
  ]
};
