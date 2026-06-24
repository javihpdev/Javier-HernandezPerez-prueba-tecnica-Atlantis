import {Component, inject} from '@angular/core';
import {
  MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef
} from "@angular/material/snack-bar";
import {MatButtonModule} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";

@Component({
    selector: 'app-snackbar',
    imports: [MatButtonModule, MatSnackBarModule, TranslateModule],
    templateUrl: './snackbar.component.html',
    styleUrl: './snackbar.component.scss'
})
export class SnackbarComponent {
  snackBarRef = inject(MatSnackBarRef);
  public data: {message: string} = inject(MAT_SNACK_BAR_DATA);
}
