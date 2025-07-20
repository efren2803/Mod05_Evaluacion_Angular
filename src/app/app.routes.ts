import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { 
    path: 'dashboard', 
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'componentes',
        loadComponent: () => import('./componentes/componentes.component').then(m => m.ComponentesComponent),
        title: 'Lista de Componentes'
      },
      {
        path: 'agregar',
        loadComponent: () => import('./agregar-componente/agregar-componente.component').then(m => m.AgregarComponenteComponent),
        title: 'Agregar Componente'
      },
      {
        path: '',
        redirectTo: 'componentes',
        pathMatch: 'full'
      }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
