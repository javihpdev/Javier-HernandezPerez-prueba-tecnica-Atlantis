import { Directive, inject, input, output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RegisterService } from '../../../services/register/register.service';

@Directive()
export abstract class StepBaseComponent {
  readonly step = input<number>(1);
  readonly totalSteps = input<number>(3);
  readonly previous = output<void>();
  readonly next = output<void>();

  protected readonly registerService = inject(RegisterService);

  
  abstract get form(): FormGroup;

  onSubmit(): void {
    this.registerService.triggerValidation(this.form);
    if (this.form.valid) {
      this.next.emit();
    }
  }

  goBack(): void {
    this.previous.emit();
  }
}
