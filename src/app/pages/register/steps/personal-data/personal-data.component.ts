import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../../components/atoms/input/input.component';
import { ButtonComponent } from '../../../../components/atoms/button/button.component';
import { RouterLink } from '@angular/router';
import { StepBaseComponent } from '../step-base.component';

@Component({
  selector: 'app-personal-data',
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent, RouterLink],
  templateUrl: './personal-data.component.html',
  styleUrl: './personal-data.component.scss'
})
export class PersonalDataComponent extends StepBaseComponent {
  override get form() {
    return this.registerService.personalDataForm;
  }
}
