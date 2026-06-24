import {Component, EventEmitter, Inject, Input, OnInit, Optional, Output} from '@angular/core';
import {InputComponent} from "../../../../components/material-components/input/input.component";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {ActionEnum} from "../../../../enums/action.enum";
import {IAirline} from "../../../../interfaces/iAirline";

@Component({
    selector: 'app-zed-airlines-form',
    imports: [
        InputComponent,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatDialogTitle,
        ReactiveFormsModule,
        TranslateModule
    ],
    templateUrl: './zed-airlines-form.component.html',
    styleUrl: './zed-airlines-form.component.scss'
})
export class ZedAirlinesFormComponent implements OnInit{
  protected readonly ActionEnum = ActionEnum;
  @Input() action: ActionEnum = ActionEnum.ADD;
  inProcess: boolean = false;
  /**
   * An EventEmitter instance for submitting events.
   */
  @Output() emitSubmit = new EventEmitter<IAirline>();

  form = new FormGroup({
    code: new FormControl<string>('', {updateOn: 'blur'}),
    name: new FormControl<string>('', {updateOn: 'blur'}),
  })

  constructor(
    @Optional() dialogRef: MatDialogRef<ZedAirlinesFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: {modal: boolean, action: ActionEnum} | null,
  ) {
    console.log(data)
    if(data && data.modal && data.action){
      this.action = data.action;
    }
    console.log(dialogRef)
  }

  ngOnInit() {

    if(this.action == ActionEnum.ADD || this.action == ActionEnum.EDIT){
      this.form.get('code')?.setValidators([Validators.required]);
      this.form.get('code')?.updateValueAndValidity();
      this.form.get('name')?.setValidators([Validators.required]);
      this.form.get('name')?.updateValueAndValidity();

    }
  }

  /**
   * Submits the form and emits the form object if it is valid.
   *
   * @returns {void}
   */
  submit(): void{
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity({onlySelf: false, emitEvent: true});
    if(this.form.valid){
      this.inProcess = true;
      //Prueba para ver el botón cargando, quitar timeout
      setTimeout(() => {
        this.inProcess = false;
        this.emitSubmit.emit({
          code: this.form.value.code ?? '',
          name: this.form.value.name ?? '',
        });
      },2000)

    }
  }
}
