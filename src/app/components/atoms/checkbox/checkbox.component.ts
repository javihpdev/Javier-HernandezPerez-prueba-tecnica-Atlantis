import { NgClass } from '@angular/common';
import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import { MainService } from '../../../services/main.service';

@Component({
    selector: 'div[app-checkbox]',
    imports: [
        NgClass,
        ReactiveFormsModule,
        TranslateModule,
    ],
    templateUrl: './checkbox.component.html',
    styleUrls: ['../atoms.component.scss']
})
export class CheckboxComponent implements OnInit{
  mainService = inject(MainService);
  @Input({required: true}) form: AbstractControl = new FormGroup({
    input: new FormControl<string>('')
  });
  @Output() linkEmitter = new EventEmitter<any>;

  @Input({required: true}) control: string = 'input';
  @Input() label: string = '';
  @Input() labelHTML: string = '';
  @Input() description?: string;
  @Input() descriptionInline?: boolean = false;
  @Input() readonly: boolean = false;
  @Input() required: boolean = false;
  @Input() errorMsg: string = '';
  @Input() formFieldClassList = {};
  @Input() classList = "";
  @Input() fullLength: boolean = true;
  @Input() descriptionColumn: boolean = false;
  @Input() border: boolean = true;

  id: string = '';

  ngOnInit() {
    this.id = 'id-' + this.control + this.mainService.randomValue;
  }

  get formControl(): FormControl{
    return this.form.get(this.control) as FormControl;
  }


}

