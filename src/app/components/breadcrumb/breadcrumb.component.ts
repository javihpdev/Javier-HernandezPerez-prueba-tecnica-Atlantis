import {Component, inject} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {NavigationEnd, Router, RouterLink} from "@angular/router";
import {TranslateModule, TranslateService as NgxTranslateService} from "@ngx-translate/core";
import {LocalizeRouterPipe} from "@gilsdav/ngx-translate-router";
import {BreadcrumbTextPipe} from "../../pipes/breadcrumb-text.pipe";

@Component({
    selector: 'app-breadcrumb',
    imports: [
        RouterLink,
        LocalizeRouterPipe,
        TranslateModule,
        BreadcrumbTextPipe
    ],
    templateUrl: './breadcrumb.component.html',
    styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  private _ngxTranslateService: NgxTranslateService = inject(NgxTranslateService);
  private _router: Router = inject(Router);
  private readonly _locale = this._ngxTranslateService.currentLang ?? 'es';
  url: Array<string> = [];
  constructor() {
    this.url = this._router.url.slice(4).split('/');
    this._router.events.subscribe(async (event: any) => {
      if (event instanceof NavigationEnd) {
        this.url = this._router.url.slice(4).split('/');
      }
    });
  }

  /**
   * Returns an array of router links based on the given value.
   *
   * @param {string} value - The value to generate the router links.
   * @return {Array<string>} - The array of router links.
   */
  getRouterLink(value: string): Array<string>{
    let response: Array<string> = ['/', this._locale];
    let flag = true;
    this.url.forEach((_val) => {
      if(flag){
        response.push(value);
        if(value == value){
          flag = false;
        }
      }
    })

    return response;
  }

}
