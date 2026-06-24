import { Injectable } from '@angular/core';
import { CookieService } from '../cookie/cookie.service';
import { Roles } from '../../enums/roles.enum';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private cookieService: CookieService) { }

  isAllowed(allowedRoles: Roles[]): boolean{
    const currentUserRole = this.cookieService.getCookie('userRol');
    return allowedRoles.includes(currentUserRole as Roles);
  }
}
