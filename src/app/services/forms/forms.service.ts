import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  /**
   * Devuelve true si el control es válido
   * */
  isInvalid(form: any, control: string) {
    return form.controls[control].invalid && (form.controls[control].dirty || form.controls[control].touched);
  }
}
