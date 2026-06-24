import {Component, Input} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {
  MatDatepickerModule,
} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MomentDateAdapter} from "@angular/material-moment-adapter";

@Component({
    selector: 'div [app-datepicker]',
    imports: [
        MatFormFieldModule, MatInputModule, MatDatepickerModule, TranslateModule, ReactiveFormsModule
    ],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        {
            provide: MAT_DATE_FORMATS, useValue: {
                parse: {
                    dateInput: ['DD-MM-YYYY']
                },
                display: {
                    dateInput: 'DD/MM/YYYY',
                    dateOutput: 'YYYY-MM-DD',
                    monthYearLabel: 'MMMM YYYY',
                    dateA11yLabel: 'LL',
                    monthYearA11yLabel: 'MMMM YYYY',
                }
            }
        }
    ],
    templateUrl: './datepicker.component.html',
    styleUrl: './datepicker.component.scss'
})
export class DatepickerComponent {
  @Input({required: true}) form: AbstractControl = new FormGroup({
    datePicker: new FormControl<string>('')
  });
  @Input({required: true}) control: string = 'datePicker';
  @Input({required: true}) label: string = 'Date';

  get formControl(): FormControl{
    return this.form.get(this.control) as FormControl;
  }

}
