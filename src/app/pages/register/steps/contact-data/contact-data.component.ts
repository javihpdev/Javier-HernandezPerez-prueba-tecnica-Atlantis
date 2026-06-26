import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../../components/atoms/input/input.component';
import { ButtonComponent } from '../../../../components/atoms/button/button.component';
import { StepBaseComponent } from '../step-base.component';

@Component({
  selector: 'app-contact-data',
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './contact-data.component.html',
  styleUrl: './contact-data.component.scss'
})
export class ContactDataComponent extends StepBaseComponent {
  override get form() {
    return this.registerService.contactDataForm;
  }
}
