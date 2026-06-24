import {inject, Inject, Injectable, PLATFORM_ID} from "@angular/core";
import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {ActivatedRouteSnapshot} from "@angular/router";

@Injectable({ providedIn: 'root' })
export class MainService {
  private _document: Document = inject(DOCUMENT);

  private _screenWidth:number = 0;
  private _screenHeight:number = 0;

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: any
    ) {
  }


  get screenWidth(): number {
    return this._screenWidth;
  }

  set screenWidth(value: number) {
    this._screenWidth = value;
  }

  get screenHeight(): number {
    return this._screenHeight;
  }

  set screenHeight(value: number) {
    this._screenHeight = value;
  }

  isBrowser(): boolean{
    return isPlatformBrowser(this.platformId);
  }

  isXS() {
    return this.isBrowser() && this._screenWidth>400;
  }

  isSM() {
    return this.isBrowser() && this._screenWidth>576;
  }

  isMD() {
    return this.isBrowser() && this._screenWidth>768;
  }

  is992() {
    return this.isBrowser() && this._screenWidth>992;
  }

  isLG() {
    return this.isBrowser() && this._screenWidth>1139;
  }

  isXL() {
    return this.isBrowser() && this._screenWidth>1200;
  }

  isXXL() {
    return this.isBrowser() && this._screenWidth>1400;
  }

  /**
   *
   * Encuentra él data de la ruta, No encontre otra forma de hacerlo que con if aninandos, refactorizar en un futuro
   *
   * */
  public static getData(children: ActivatedRouteSnapshot[], key: string): any {
    function findData(snapshot: ActivatedRouteSnapshot[]): any {
      if (snapshot.length > 0) {
        const data = snapshot[0].data;
        if (data[key]) {
          return data;
        } else if (snapshot[0].children.length > 0) {
          return findData(snapshot[0].children);
        }
      }
      return null;
    }
    return findData(children);
  }

  copyClipboard(text : string){
    navigator.clipboard.writeText(text);
  }

  public static clearUrl(url: string): string {
    url = url.slice(4);
    url = url.split('?')[0];
    url = url.split('#')[0];
    return url.split('/').join('/');
  }

  /**
   * Devuelve un valor random
   */
  get randomValue(){
     let valor:number =  Math.floor(Math.random() * 10000) + 1;
     return ('00000'+ valor).slice(-5);
  }
}
