import { Routes } from '@angular/router';
import { Breadcrumb } from './classes/breadcrumb/breadcrumb';
import { ROUTES } from '../config/config';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/main/main.component').then(c => c.MainComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home.component').then(c => c.HomeComponent)
      },
      {
        path: 'design-system',
        data: {
          breadcrumb: Breadcrumb.create([{label: 'Inicio', route: ROUTES.HOME},{label: 'Design System', route: ROUTES.DESIGN_SYSTEM}]),
        },
        loadComponent: () => import('./pages/design-system/design-system.component').then(c => c.DesignSystemComponent)
      },
      {
        path: 'register',
        data: {
          breadcrumb: Breadcrumb.create([{label: 'Inicio', route: ROUTES.HOME},{label: 'Register', route: ROUTES.REGISTER}]),
        },
        loadComponent: () => import('./pages/register/register.component').then(c => c.RegisterComponent)
      },
      {
        path: 'register-success',
        data: {
          breadcrumb: Breadcrumb.create([{label: 'Inicio', route: ROUTES.HOME},{label: 'Register Success', route: ROUTES.REGISTER_SUCCESS}]),
        },
        loadComponent: () => import('./pages/register-success/register-success.component').then(c => c.RegisterSuccessComponent)
      },
    ]
  },

  {
    path: '**',
    loadComponent: () =>
      import('./pages/errors/e404/e404.component').then(c => c.E404Component)
  }
];