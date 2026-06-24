import {inject, Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackbarComponent} from "../../../components/material-components/snackbar/snackbar.component";


@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  showError(message: string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      data:{
        message
      },
      panelClass: ['snackbar-error'],
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 10000
    });
  }

  showSuccess(message: string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      data:{
        message
      },
      panelClass: ['snackbar-success'],
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }
}
