//import {RECAPTCHA_LOADER_OPTIONS, RECAPTCHA_SETTINGS} from "ng-recaptcha-2";
import {LocalizeRouterModule} from "@gilsdav/ngx-translate-router";
import {TranslateModule} from "@ngx-translate/core";
import {ApolloTestingModule} from "apollo-angular/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {RouterModule} from "@angular/router";
import {routes} from "./app/app.routes";
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {LocalizedDatePipe} from "./app/pipes/localizedDate.pipe";

export const testCommonModules = [
  RouterModule.forRoot(routes),
  LocalizeRouterModule.forRoot(routes),
  TranslateModule.forRoot(),
  ApolloTestingModule,
  BrowserAnimationsModule,
]

export const testCommonProviders = [
  { provide: 'req', useValue: null },
  {
    provide: MAT_DIALOG_DATA,
    useValue: {}
  },
  provideHttpClient(withInterceptorsFromDi()),
  provideHttpClientTesting(),
  // {
  //   provide: RECAPTCHA_SETTINGS,
  //   useValue: {
  //     siteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
  //   },
  // },
  // {
  //   provide: RECAPTCHA_LOADER_OPTIONS,
  //   useValue: {
  //     onBeforeLoad(_url: URL) {
  //       return {
  //         url: new URL("https://www.google.com/recaptcha/enterprise.js"),
  //       };
  //     },
  //     onLoaded(recaptcha: any) {
  //       return recaptcha.enterprise;
  //     },
  //   },
  // },
  LocalizedDatePipe
]
