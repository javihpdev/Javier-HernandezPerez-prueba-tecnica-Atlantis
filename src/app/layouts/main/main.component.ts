import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, RouterLink, BreadcrumbComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  // private _authService: AuthService = inject(AuthService);
  // private _rolesService: RolesService = inject(RolesService);

  // isAllowed(roles: Roles[]){
  //   return this._rolesService.isAllowed(roles);
  // }
}
