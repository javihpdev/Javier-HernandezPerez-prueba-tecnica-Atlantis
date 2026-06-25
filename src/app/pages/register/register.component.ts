import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { ROUTES } from '../../../config/config';
import { PersonalDataComponent } from './steps/personal-data/personal-data.component';
import { ContactDataComponent } from './steps/contact-data/contact-data.component';
import { LegalBasesComponent } from './steps/legal-bases/legal-bases.component';

@Component({
  selector: 'app-register',
  imports: [PersonalDataComponent, ContactDataComponent, LegalBasesComponent],
  templateUrl: './register.component.html',
  styleUrl:'./register.component.scss'
})
export class RegisterComponent {
  private readonly router = inject(Router);
  // insertamos localizerouter porque hay que respetar el idioma activo de la web, si lo hacemos directamente con router quedaria /register no /es/register y se veria todo blanco / vacio
  private readonly localize = inject(LocalizeRouterService);

  readonly currentStep = signal(1);
  readonly totalSteps = 3;

  next(): void {
    this.currentStep.update(step => step + 1);
  }

  previous(): void {
    this.currentStep.update(step => step - 1);
  }

  complete(): void {
    this.router.navigate([this.localize.translateRoute(ROUTES.REGISTER_SUCCESS)]);
  }
}
