import {Component, EventEmitter, Inject, Input, OnInit, Optional, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {InputComponent} from "../../../../components/material-components/input/input.component";
import {CheckboxComponent} from "../../../../components/material-components/checkbox/checkbox.component";
import {DatepickerComponent} from "../../../../components/material-components/datepicker/datepicker.component";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {ActionEnum} from "../../../../enums/action.enum";
import {IAirport} from "../../../../interfaces/iAirport";

@Component({
    selector: 'app-airports-form',
    imports: [
        ReactiveFormsModule,
        TranslateModule,
        InputComponent,
        CheckboxComponent,
        DatepickerComponent,
        MatDialogContent,
        MatDialogClose,
        MatDialogActions,
        MatDialogTitle
    ],
    templateUrl: './airports-form.component.html',
    styleUrl: './airports-form.component.scss'
})
export class AirportsFormComponent implements OnInit{
  protected readonly ActionEnum = ActionEnum;
  @Input() action: ActionEnum = ActionEnum.ADD;
  inProcess: boolean = false;
  /**
   * An EventEmitter instance for submitting events.
   */
  @Output() emitSubmit = new EventEmitter<IAirport>();

  form = new FormGroup({
    code: new FormControl<string>('', {updateOn: 'blur'}),
    name: new FormControl<string>('', {updateOn: 'blur'}),
    recessDate: new FormControl<string>('', {updateOn: 'blur'}),
    serviceDate: new FormControl<string>('', {updateOn: 'blur'}),
    courtesyDate: new FormControl<string>('', {updateOn: 'blur'}),
    international: new FormControl<boolean>(false),
    national: new FormControl<boolean>(false),
  })

  constructor(
    @Optional() dialogRef: MatDialogRef<AirportsFormComponent>,
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
      this.form.get('code')?.setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(3)]);
      this.form.get('code')?.updateValueAndValidity();
      this.form.get('name')?.setValidators([Validators.required]);
      this.form.get('name')?.updateValueAndValidity();
      this.form.get('recessDate')?.setValidators([Validators.required]);
      this.form.get('recessDate')?.updateValueAndValidity();
      this.form.get('serviceDate')?.setValidators([Validators.required]);
      this.form.get('serviceDate')?.updateValueAndValidity();
      this.form.get('courtesyDate')?.setValidators([Validators.required]);
      this.form.get('courtesyDate')?.updateValueAndValidity();
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
          courtesyDate: this.form.value.courtesyDate ?? '',
          international: this.form.value.international ?? false,
          name: this.form.value.name ?? '',
          national: this.form.value.national ?? false,
          recessDate: this.form.value.recessDate ?? '',
          serviceDate: this.form.value.serviceDate ?? ''
        });
      },2000)

    }
  }


}
