import { Component, computed, inject, input, output, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from '../../../../services/register/register.service';
import { CheckboxComponent } from '../../../../components/atoms/checkbox/checkbox.component';
import { ButtonComponent } from '../../../../components/atoms/button/button.component';

@Component({
  selector: 'app-legal-bases',
  imports: [ReactiveFormsModule, CheckboxComponent, ButtonComponent],
  templateUrl: './legal-bases.component.html',
  styleUrl: './legal-bases.component.scss'
})
export class LegalBasesComponent {
  readonly step = input<number>(3);
  readonly totalSteps = input<number>(3);

  readonly complete = output<void>();
  readonly previous = output<void>();

  private readonly registerService = inject(RegisterService);

  private readonly showErrors = signal(false);

  get form() {
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

  onSubmit(): void {
    this.showErrors.set(true);
    this.registerService.triggerValidation(this.form);
    if (this.form.valid) {
      this.complete.emit();
    }
  }

  goBack(): void {
    this.previous.emit();
  }
}
