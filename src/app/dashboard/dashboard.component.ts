import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  menuItems = [
    { path: '/dashboard/componentes', label: 'Listar Componentes', icon: 'bi-list' },
    { path: '/dashboard/agregar', label: 'Agregar Compomente', icon: 'bi-person' },
    // Agrega más items según necesites
  ];

  constructor(private router: Router) { }

  logout() {
    // 1. Eliminar token de autenticación
    localStorage.removeItem('auth_token');

    // 2. Redirigir al login
    this.router.navigate(['/login']);

    // 3. (Opcional) Limpiar cualquier estado de la aplicación
  }
}
