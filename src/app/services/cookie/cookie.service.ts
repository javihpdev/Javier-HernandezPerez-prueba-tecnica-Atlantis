import {Inject, inject, Injectable, Optional, PLATFORM_ID, DOCUMENT} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";
import {REQUEST} from "../../../express.tokens";
import {Request} from "express";
@Injectable({
  providedIn: 'root'
})
export class CookieService {
  /**
   * Represents the platform identifier object.
   *
   * @property {any} PLATFORM_ID - The platform identifier injected using the `PLATFORM_ID` token.
   */
  private readonly _platformId: Object = inject(PLATFORM_ID);
  /**
   * The variable '_document' is a reference to the global 'Document' object.
   * It is obtained using the 'inject' function with the 'DOCUMENT' token.
   *
   * @type {Document}
   */
  private readonly _document: Document = inject(DOCUMENT);


  /**
   * Cookie store object that holds cookie data.
   *
   * @type {Object}
   */
  private _cookieStore: any = {};


  constructor(@Optional() @Inject(REQUEST) private _request: Request) {
    if (!this.isBrowser()) {
      const cookies = !!this._request.headers['cookie'] ? this._request.headers['cookie'] : null;
      if(cookies){
        this.parseCookies(cookies);
      }
    } else{
      this.parseCookies(this._document.cookie);
    }
  }



  /**
   * Sets a key-value pair in the set.
   *
   * @param {string} key - The key associated with the value.
   * @param {string} value - The value to be set for the given key.
   * @return {void} - Returns nothing.
   */
  set(key: string, value: string): void;
  /**
   * Sets a key-value pair in the cache with an optional expiration date.
   *
   * @param {string} key - The key to set in the cache.
   * @param {string} value - The value to associate with the key.
   * @param {Date} expires - An optional expiration date for the key-value pair.
   * @return {void}
   */
  set(key: string, value: string, expires: Date): void;
  /**
   * Sets a cookie with the given key and value.
   *
   * @param {string} key - The key of the cookie.
   * @param {string} value - The value of the cookie.
   * @param {Date} [expires] - The expiry date of the cookie (optional).
   * @return {void}
   */
  set(key: string, value: string, expires?: Date): void {
    if(this.isBrowser()){
      let cookieValue = `${key}=${value};path=/`;
      if (expires) cookieValue += `;expires='${expires.toUTCString()}'`
      this._document.cookie = cookieValue;
    }
  }

  /**
   * Sets a key-value pair with an expiration time specified in years.
   *
   * @param {string} key - The key for the key-value pair.
   * @param {string} value - The value for the key-value pair.
   * @param {number} expires - The number of years until the key-value pair expires.
   *
   * @return {void}
   */
  setWithExpiryInYears(key: string, value: string, expires: number) {
    this.setWithExpiryInDays(key, value, expires * 365);
  }

  /**
   * Sets a key-value pair with an expiration time in days.
   *
   * @param {string} key - The key to set.
   * @param {string} value - The value to set.
   * @param {number} expires - The number of days until the key-value pair expires.
   * @return {void} - This method does not return a value.
   *
   * @example
   * setWithExpiryInDays('myKey', 'myValue', 7);
   * // Sets 'myKey' with 'myValue' and expires after 7 days.
   */
  setWithExpiryInDays(key: string, value: string, expires: number) {
    this.setWithExpiryInHours(key, value, expires * 24);
  }

  /**
   * Sets a key-value pair with an expiry time in hours.
   *
   * @param {string} key - The key of the item to set.
   * @param {string} value - The value of the item to set.
   * @param {number} expires - The expiry time in hours.
   * @return {void}
   */
  setWithExpiryInHours(key: string, value: string, expires: number) {
    this.setWithExpiryInMinutes(key, value, expires * 60);
  }

  /**
   * Sets the value for the given key with an expiry time specified in minutes.
   * If the expiry time is not provided, the value will not have an expiry.
   *
   * @param {string} key - The key to set the value for.
   * @param {string} value - The value to be set.
   * @param {number} expires - The expiry time in minutes.
   *
   * @return {void}
   */
  setWithExpiryInMinutes(key: string, value: string, expires: number) {
    this.setWithExpiryInSeconds(key, value, expires * 60);
  }

  /**
   * Sets a key-value pair with an expiry time in seconds.
   * @param {string} key - The key to set.
   * @param {string} value - The value to set.
   * @param {number} expires - The expiry time in seconds.
   * @return {void}
   */
  setWithExpiryInSeconds(key: string, value: string, expires: number) {
    this.setWithExpiryInMiliseconds(key, value, expires * 1000);
  }

  /**
   * Sets a key-value pair with an expiry time in milliseconds.
   *
   * @param {string} key - The key for the value to be stored.
   * @param {string} value - The value to be stored.
   * @param {number} expires - The expiry time in milliseconds.
   *
   * @return {void}
   */
  setWithExpiryInMiliseconds(key: string, value: string, expires: number) {
    let expireDate = new Date();
    let time = expireDate.getTime() + expires;
    expireDate.setTime(time);
    this.set(key, value, expireDate);
  }

  /**
   * Retrieves the value associated with the specified key from the document's cookie.
   *
   * @param {string} key - The key used to retrieve the value from the cookie.
   * @returns {string} The value associated with the specified key, or an empty string if the key is not found.
   */
  get(key: string): string {
    const decodedCookie: string = decodeURIComponent(this._document.cookie);
    const pairs: string[] = decodedCookie.split(/;\s*/);
    const prefix = `${key}=`;
    for (const pair of pairs) {
      if (pair.indexOf(prefix) == 0) {
        return pair.substring(prefix.length);
      }
    }
    return "";
  }


  /**
   * Parses the given cookies and stores them in the cookie store.
   *
   * @param {any} cookies - The cookies to be parsed.
   */
  public parseCookies(cookies: any) {
    this._cookieStore = {};
    if (!!cookies === false) { return; }
    let cookiesArr = cookies.split(';');
    for (const cookie of cookiesArr) {
      const cookieArr = cookie.split(/=(.*)/s);
      this._cookieStore[cookieArr[0].trim()] = cookieArr[1].trim();
    }
  }

  /**
   * Retrieves the value of a cookie based on a given key.
   *
   * @param {string} key - The key of the cookie to retrieve.
   *
   * @return {string|null} - The value of the retrieved cookie, or null if the cookie does not exist.
   */
  getCookie(key: string) {
    if(this.isBrowser()){
      return this.get(key);
    }else{
      return !!this._cookieStore[key] ? this._cookieStore[key] : null;
    }
  }

  /**
   * Checks if the current platform is a browser.
   *
   * @returns {boolean} - `true` if the current platform is a browser, `false` otherwise.
   */
  isBrowser(): boolean{
    return isPlatformBrowser(this._platformId);
  }

}
