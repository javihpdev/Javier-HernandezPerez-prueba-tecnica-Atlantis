import { Component, inject, input, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from '../../../../services/register/register.service';
import { InputComponent } from '../../../../components/atoms/input/input.component';
import { ButtonComponent } from '../../../../components/atoms/button/button.component';

@Component({
  selector: 'app-contact-data',
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './contact-data.component.html',
  styleUrl: './contact-data.component.scss'
})
export class ContactDataComponent {
  readonly step = input<number>(2);
  readonly totalSteps = input<number>(3);

  readonly next = output<void>();
  readonly previous = output<void>();

  private readonly registerService = inject(RegisterService);

  get form() {
    return this.registerService.contactDataForm;
  }

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
 