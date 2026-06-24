import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { CookieService } from '../services/cookie/cookie.service';

@Injectable()
export class BrowserInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // Modificar 'authToken' por el nombre de la cookie que contenga el token de seguridad
    const token = this.cookieService.getCookie('authToken');
    // Introducimos el token en la cabecera si existiera.
    const authReq = token ? request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    }) : request;

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // Error del lado del cliente o de red
          errorMessage = `Error del cliente: ${error.error.message}`;
        } else {
          // Error del lado del servidor
          errorMessage = `Error del servidor: ${error.status}\nMensaje: ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
