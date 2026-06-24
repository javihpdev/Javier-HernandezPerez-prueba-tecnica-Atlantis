import {inject, Injectable, PLATFORM_ID} from '@angular/core';
import {firstValueFrom, Subject} from "rxjs";
import {isPlatformBrowser} from "@angular/common";
import { HttpClient } from "@angular/common/http";

export interface Api {
  api: {
    environmentConfig: EnviromentConfig,
  }
}

export interface EnviromentConfig {
  ENVIRONMENT: string,
  API_URL: string,
  GRAPHQL_ENDPOINT: string,
}

@Injectable({
  providedIn: 'root'
})
export class EnviromentService {
  private _platformId: Object = inject(PLATFORM_ID);
  private _httpClient: HttpClient = inject(HttpClient);
  private _environmentConfig: EnviromentConfig;
  private _isInitializer: Subject<boolean> = new Subject<boolean>();
  public isInitializer$ = this._isInitializer.asObservable();
  public isInitializer = false;
  constructor() {

    this._environmentConfig = {
      ENVIRONMENT: 'local',
      API_URL: 'http://127.0.0.1:8000',
      GRAPHQL_ENDPOINT: '/main/grapqhl',
    }

  }

  /**
   * Initializes the application.
   * @return {Promise<void>} A Promise that resolves once the initialization is complete.
   */
  init(): Promise<void> {
    return new Promise(resolve => {
      this.load().then(() => {
        this._isInitializer.next(true);
        this.isInitializer = true;
        resolve();
      });
    });
  }

  /**
   * Loads the app configuration from a JSON file.
   *
   * @returns {Promise<void>} A promise that resolves when the configuration is successfully loaded or rejects with an error message if the configuration file could not be loaded.
   */
  async load() {
    const jsonFile = `/assets/config/config.json`;

    return new Promise<void>((resolve, reject) => {
      firstValueFrom(this._httpClient
        .get(jsonFile))
        .then(async (response: any) => {
          let responseData: Api = response
          this._environmentConfig = responseData.api.environmentConfig;
          resolve();
        })
        .catch((response: any) => {
          reject(
            `Could not load app configuration file '${jsonFile}': ${JSON.stringify(
              response
            )}`
          )
        })
    })
  }


  /**
   * Returns the environment configuration.
   *
   * @returns {EnviromentConfig} The environment configuration object.
   */
  get environmentConfig(): EnviromentConfig {
    return this._environmentConfig;
  }

}
