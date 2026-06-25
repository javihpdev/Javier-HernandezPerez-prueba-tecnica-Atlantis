import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { RegisterService } from '../../services/register/register.service';
import { ButtonComponent } from '../../components/atoms/button/button.component';
import { ROUTES } from '../../../config/config';
import { ɵɵRouterLink } from "@angular/router/testing";

@Component({
  selector: 'app-register-success',
  imports: [ButtonComponent, ɵɵRouterLink],
  templateUrl: './register-success.component.html',
  styleUrl: './register-success.component.scss'
})
export class RegisterSuccessComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly localize = inject(LocalizeRouterService);
  private readonly registerService = inject(RegisterService);

  readonly data = this.registerService.registrationData;
  readonly hasData = signal(false);

  ngOnInit(): void {
    if (!this.data.name) {
      this.router.navigate([this.localize.translateRoute(ROUTES.REGISTER)]);
    } else {
      this.hasData.set(true);
    }
  }

  resetForm(): void {
    this.registerService.reset();
  }
}
