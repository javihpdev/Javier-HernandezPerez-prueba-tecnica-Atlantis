import { Component } from '@angular/core';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {TranslateModule} from "@ngx-translate/core";
import {ConfirmResultEnum} from "../../../enums/confirm-result.enum";

@Component({
    selector: 'app-confirm',
    imports: [MatDialogModule, TranslateModule],
    templateUrl: './confirm.component.html',
    styleUrl: './confirm.component.scss'
})
export class ConfirmComponent {

  constructor(private _dialogRef: MatDialogRef<ConfirmComponent>) {
  }

  /**
   * Performs the click event action.
   * Closes the dialog with the given result 'OK'.
   *
   * @return {void}
   */
  clickEvent(): void{
    this._dialogRef.close(ConfirmResultEnum.OK)
  }
}
