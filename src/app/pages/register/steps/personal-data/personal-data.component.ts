import { Component, inject, input, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from '../../../../services/register/register.service';
import { InputComponent } from '../../../../components/atoms/input/input.component';
import { ButtonComponent } from '../../../../components/atoms/button/button.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-personal-data',
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent, RouterLink],
  templateUrl: './personal-data.component.html',
  styleUrl: './personal-data.component.scss'
})
export class PersonalDataComponent {
  readonly step = input<number>(1);
  readonly totalSteps = input<number>(3);

  readonly next = output<void>();
  readonly previous = output<void>();

  private readonly registerService = inject(RegisterService);

  get form() {
    return this.registerService.personalDataForm;
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
