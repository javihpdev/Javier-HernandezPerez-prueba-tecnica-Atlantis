import { Injectable, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

// Validaciones de los campos
export function validateEmailFormat(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(control.value) ? null : { validateEmail: true };
}

export function validatePhoneFormat(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  const phoneRegex = /^[0-9]{8,15}$/;
  return phoneRegex.test(control.value.toString()) ? null : { validatePhone: true };
}

export function validateNameSurname(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  return control.value.length >= 2 ? null : { validateNameSurname: true };
}

// Esta validacion es para el prefix
export function validateNumeric(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  return /^[0-9]+$/.test(control.value.toString()) ? null : { validateInvoicePhone: true };
}

@Injectable({ providedIn: 'root' })
export class RegisterService {
  private readonly fb = inject(FormBuilder);

  readonly personalDataForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, validateNameSurname]],
    surname: ['', [Validators.required, validateNameSurname]],
    submitted: [false]
  }, { updateOn: 'submit' });

  readonly contactDataForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, validateEmailFormat]],
    prefix: ['', [Validators.required, validateNumeric]],
    phone: ['', [Validators.required, validatePhoneFormat]],
    submitted: [false]
  }, { updateOn: 'submit' });

  readonly legalBasesForm: FormGroup = this.fb.group({
    legalBases: [false, [Validators.requiredTrue]],
    privacyPolicy: [false, [Validators.requiredTrue]],
    submitted: [false]
  }, { updateOn: 'submit' });


  triggerValidation(form: FormGroup): void {
    const submitted = form.get('submitted');
    submitted?.setValue(!submitted.value);
  }

  // Los datos que recogemos para mostrarlos en register/success
  get registrationData() {
    return {
      name: this.personalDataForm.get('name')?.value as string,
      surname: this.personalDataForm.get('surname')?.value as string,
      email: this.contactDataForm.get('email')?.value as string,
      prefix: this.contactDataForm.get('prefix')?.value as string,
      phone: this.contactDataForm.get('phone')?.value as string,
      legalBases: this.legalBasesForm.get('legalBases')?.value as boolean,
      privacyPolicy: this.legalBasesForm.get('privacyPolicy')?.value as boolean,
    };
  }

  reset(): void {
    this.personalDataForm.reset({ submitted: false });
    this.contactDataForm.reset({ submitted: false });
    this.legalBasesForm.reset({ submitted: false });
  }
}
