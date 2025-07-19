import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('auth_token');
  const router = inject(Router);
  
  if (token) {
    return true; // Permite acceso
  } else {
    router.navigate(['/login']); // Redirige a login
    return false; // Bloquea acceso
  }
};
