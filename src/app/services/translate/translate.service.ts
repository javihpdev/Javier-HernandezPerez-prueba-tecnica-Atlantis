import {inject, Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {TranslateService as NgxTranslateService} from "@ngx-translate/core";
import packageJson from '@package';
/**
 * A service for translating and managing translations.
 */
@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private  _httpClient: HttpClient = inject(HttpClient);
  private _translateService: NgxTranslateService = inject(NgxTranslateService);


  /**
   * Adds a translation for a given situation.
   *
   * @param {string} situation - The situation for which the translation is added.
   * @return {Promise<void>} - A promise that resolves when the translation is added successfully.
   */
  async addTranslation(situation: string):Promise<void>{
    await lastValueFrom(this._httpClient.get('./assets/i18n/'+situation+'/'+this._translateService.currentLang+'.json?v='+ packageJson.version)).then((data: any) => {
      this.processInsertTranslates(data);
    });
  }


  /**
   * Translates and inserts the given data object into the translation service.
   *
   * @param {object} data - The data object to be translated and inserted.
   * @param {string} [key] - Optional key to prepend to each translation key.
   * @returns {void}
   */
  processInsertTranslates(data: object, key?: string):void{
    for (let [_key, value] of Object.entries(data)) {

      if(key){
        _key = key + '.' + _key;
      }

      if(_key && !this.hasTranslation(_key) && value && typeof value === "string"){
        this._translateService.set(_key, value, this._translateService.currentLang);
      }else if(_key && !this.hasTranslation(_key) && value && typeof value === "object"){
        this.processInsertTranslates(value, _key);
      }
    }
  }

  /**
   * Checks if a translation exists for the given key.
   *
   * @param {string} key - The key to check for translation.
   * @return {boolean} - Returns true if a translation exists for the key, false otherwise.
   */
  hasTranslation(key: string): boolean {
    const translation = this.getTranslation(key);
    return translation !== key && translation !== '';
  }

  /**
   * Retrieve the translation for the given key.
   *
   * @param {string} key - The key representing the translation.
   * @return {string} The translated string for the given key.
   */
  getTranslation(key: string | Array<string>): string {
    return this._translateService.instant(key);
  }
}
