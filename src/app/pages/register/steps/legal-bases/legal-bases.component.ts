import { Component, computed, output, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from '../../../../components/atoms/checkbox/checkbox.component';
import { ButtonComponent } from '../../../../components/atoms/button/button.component';
import { StepBaseComponent } from '../step-base.component';

@Component({
  selector: 'app-legal-bases',
  imports: [ReactiveFormsModule, CheckboxComponent, ButtonComponent],
  templateUrl: './legal-bases.component.html',
  styleUrl: './legal-bases.component.scss'
})
export class LegalBasesComponent extends StepBaseComponent {
  readonly complete = output<void>();
  private readonly showErrors = signal(false);

  override get form() {
    return this.registerService.legalBasesForm;
  }

  readonly legalBasesError = computed(() =>
    this.showErrors() && this.form.get('legalBases')?.invalid
      ? 'La aceptación de las bases legales es obligatoria'
      : ''
  );

  readonly privacyPolicyError = computed(() =>
    this.showErrors() && this.form.get('privacyPolicy')?.invalid
      ? 'La aceptación de la política de privacidad es obligatoria'
      : ''
  );

  override onSubmit(): void {
    this.showErrors.set(true);
    this.registerService.triggerValidation(this.form);
    if (this.form.valid) {
      this.complete.emit();
    }
  }
}
