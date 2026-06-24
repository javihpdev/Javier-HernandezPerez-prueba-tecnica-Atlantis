import {Component, Input} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {TranslateModule} from "@ngx-translate/core";
import {NgClass} from "@angular/common";
import {MatInput} from "@angular/material/input";

@Component({
    selector: 'div[app-input]',
    imports: [
        MatFormField,
        TranslateModule,
        NgClass,
        ReactiveFormsModule,
        MatInput,
        MatLabel,
        MatError
    ],
    templateUrl: './input.component.html',
    styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input({required: true}) form: AbstractControl = new FormGroup({
    input: new FormControl<string>('')
  });
  @Input({required: true}) control: string = 'input';
  @Input({required: true}) label: string = '';
  @Input() type: string = 'text';
  @Input() formFieldClassList = {};


  get formControl(): FormControl{
    return this.form.get(this.control) as FormControl;
  }
}
