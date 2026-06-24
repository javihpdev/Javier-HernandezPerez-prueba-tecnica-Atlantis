import {Component, ElementRef, inject, Input, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'div[app-input]',
    imports: [
        NgClass,
        ReactiveFormsModule,
        TranslateModule,
    ],
    templateUrl: './input.component.html',
    styleUrls: ['../atoms.component.scss']
})
export class InputComponent implements OnInit{

  @ViewChild('input') input!: ElementRef;
  @Input({required: true}) form: AbstractControl = new FormGroup({
    input: new FormControl<string>('')
  });

  @Input({required: true}) control: string = 'input';
  @Input() label: string = '';
  @Input({required: true}) type: string = 'text';
  @Input() inputMode: string = 'text';
  @Input() description?: string;
  @Input() placeholder: string | null = null;
  @Input() readonly: boolean = false;
  @Input() required: boolean = false;
  @Input() link?: {text: string, altText: string, control:string};
  @Input() icons?:{left:string, right:string};
  @Input() prefix?:string = ""; // Texto para mostrar dentro del input a la izquierda. sustituye al icono si se proporciona
  @Input() classList = "";
  @Input() formName?: string;
  @Input() min: string = '';
  @Input() max: string = '';
  @Input() checkMinMax = false;
  @Input() toUppercase = false;

  showControlError = false;
  errorText = '';

  errors: string[] = [
    'required',
    'validateOnlyLetters',
    'validateDNI',
    'validateOtherDoc',
    'validateResidentCard',
    'isDNIOrNIE',
    'validateEmail',
    'validateDate',
    'validatePostalCode',
    'validateflightNumber',
    'validatePhone',
    'validateInvoicePhone',
    'mismatchIdentityDocumentNumber',
    'validatePnr',
    'noWhiteSpace',
    'maxOneYearAhead',
    'pastOrToday',
    'maxlength',
    'validateLargeFamilyNumber'
  ];

  linkText: string = "";
  private readonly _translateService = inject(TranslateService);

  ngOnInit() {
    if(this.checkMinMax) {
      this.formControl.valueChanges.subscribe(value => {
        if(this.type == 'number'){
          const min= Number.parseInt(this.min);
          const max= Number.parseInt(this.max);
          if (value == '' || value == null) {
            this.formControl.setValue(0, {emitEvent: false});
          } else if (value < min) {
            this.formControl.setValue(this.min, {emitEvent: false});
          } else if (value > max) {
            this.formControl.setValue(this.max, {emitEvent: false});
          }
        }
        if(this.formControl.value.length > 1 && this.formControl.value < 10){
          this.formControl.setValue(this.formControl.value.replace(/^0+/, ''), {emitEvent: false});
        }
      });
    }

    this.linkText = this.link?.text ?? '';
    if(this.prefix && this.icons){
      this.icons.left = '';
    }

    if(this.form.updateOn == 'submit'){
      this.form.get('submitted')?.valueChanges.subscribe(() => {
        this.showControlError = this.form.get(this.control)?.status == 'INVALID';
        this.errorText = this.getErrorText;
      })
    }
  }

  get formControl(): FormControl{
    return this.form.get(this.control) as FormControl;
  }

  linkClick(text:string) {
    if(this.link?.control == 'password'){
      this.linkText = (text==this.link.text) ? this.link.altText : this.link.text;
      this.input.nativeElement.type=(this.input.nativeElement.type=="text") ? "password" : "text";
    }
  }

  get getErrorText(){
    let response: string = '';
    let text;

    for (let error of this.errors){
      if(text) break;

      if(this.form.get(this.control)?.hasError(error)){
        if(['required', 'noWhiteSpace'].includes(error) && this.form.get(this.control)?.hasError(error)){
          response = 'Este campo no puede estar vacío';
        }else if(error == 'validateOnlyLetters' && this.form.get(this.control)?.hasError(error)){
          response = 'No puede contener números ni caracteres especiales';
        }else if(error == 'validatePhone' && this.form.get(this.control)?.hasError(error)){
          response = 'El teléfono solo debe contener entre 8 y 15 dígitos';
        } else if(error == 'validateInvoicePhone' && this.form.get(this.control)?.hasError(error)){
          response = 'El teléfono debe contener dígitos';
        }else if(error == 'mismatchIdentityDocumentNumber' && this.form.get(this.control)?.hasError(error)){
          response = 'No es posible utilizar un mismo documento de identificación en distintos pasajeros';
        }else if(['validateDNI', 'validateOtherDoc', 'validateResidentCard', 'isDNIOrNIE', 'validateEmail', 'validatePostalCode', 'validateLargeFamilyNumber'].includes(error) && this.form.get(this.control)?.hasError(error)){
          response = 'El formato no coincide con el esperado';
        }else if(['validatePnr'].includes(error) && this.form.get(this.control)?.hasError(error)){
          response = 'Teclee un localizador válido';
        }else if(['maxOneYearAhead'].includes(error) && this.form.get(this.control)?.hasError(error)){
          response = 'La fecha no puede ser mayor a un año desde hoy';
        }else if(['pastOrToday'].includes(error) && this.form.get(this.control)?.hasError(error)){
          response = 'La fecha no puede ser mayor a la fecha actual';
        } else if(['maxlength'].includes(error) && this.form.get(this.control)?.hasError(error)){
          response = this._translateService.instant('El texto no puede superar los') + ' ' + this.form.get(this.control)?.errors?.['maxlength'].requiredLength + ' ' + this._translateService.instant('caracteres');
        }else{
          response = 'Este campo no es válido';
        }
      }
    }
    return response;
  }

  onKeyup(event: any) {
    if(this.toUppercase){
      const input = event.target;
      this.formControl.setValue(input.value.toUpperCase(), {onlySelf: false, emitEvent: false})
    }
  }

}

