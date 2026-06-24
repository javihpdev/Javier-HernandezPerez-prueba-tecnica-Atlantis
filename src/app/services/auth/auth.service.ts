import {inject, Injectable} from '@angular/core';
import {CookieService} from "../cookie/cookie.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   * @classdesc Represents a service for managing cookies.
   * @class
   * @name CookieService
   */
  private _cookieService: CookieService = inject(CookieService);
  /**
   * Represents an injected instance of a Router.
   *
   * @type {Router}
   * @instance
   */
  private _router: Router = inject(Router);
  /**
   * Represents the URL of the current router in the application.
   *
   * @type {string}
   */
  private _url: string = this._router.url;

  /**
   * Logs in a user asynchronously.
   *
   * @returns {Promise<void>} A promise that resolves when the user is logged in.
   */
  async login(username: string, password: string, rememberMe: boolean):Promise<void>{
    if (rememberMe) {
      this._cookieService.setWithExpiryInYears('rememberMe', JSON.stringify({
        username: username,
        password: password,
        rememberMe: true
      }), 1);
    } else {
      this._cookieService.setWithExpiryInMiliseconds('rememberMe', '', 1);
    }
    this._cookieService.set('authToken', 'Example Token');
    this._cookieService.set('userRol', 'ADMIN');
    window.location.href = this._url;
  }

  /**
   * Logout the current user.
   * @returns {Promise<void>} A promise that resolves when the user is successfully logged out.
   */
  async logout():Promise<void>{
    this._cookieService.setWithExpiryInMiliseconds('authToken', '', 1);
    window.location.reload();
  }

  /**
   * Check if a user is authenticated.
   *
   * @returns {boolean} - Returns true if the user is authenticated, otherwise false.
   */
  get isAuthenticated(): boolean{
    return !!this._cookieService.getCookie('authToken');
  }


  /**
   * Creates a login form group.
   *
   * @return {FormGroup} The login form group.
   */
  get loginForm(): FormGroup{
    return new FormGroup({
      username: new FormControl<string>('secret', {updateOn: 'blur', validators: [Validators.required]}),
      password: new FormControl<string>('secret', {updateOn: 'blur', validators: [Validators.required]}),
      rememberMe: new FormControl<boolean>(false),
    })
  }


  /**
   * Retrieves the remember me data.
   * @returns {Object|null} - The remember me data containing username and password, or null if the remember me data is not available.
   */
  rememberData(): {
    username: string,
    password: string,
    rememberMe: boolean
  } | null{
    let rememberMe = this._cookieService.getCookie('rememberMe');
    if(rememberMe){
      rememberMe = JSON.parse(rememberMe);
      return rememberMe
    }
    return null
  }

  /**
   * Creates a login form group.
   *
   * @return {FormGroup} The login form group.
   */
  get forgorPasswordForm(): FormGroup{
    return new FormGroup({
      email: new FormControl<string>('', {updateOn: 'blur', validators: [Validators.required]})
    })
  }


}
