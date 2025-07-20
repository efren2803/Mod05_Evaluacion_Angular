import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Obtener token de localStorage
  const token = localStorage.getItem('auth_token');
  const router = inject(Router);

  // 2. Clonar petición para agregar headers
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    
    // 3. Manejar respuesta con posible error 401
    return next(authReq).pipe(
      catchError((error) => {
        if (error.status === 401) {
          handleUnauthorized(router);
        }
        return throwError(() => error);
      })
    );
  }
  
  // 4. Si no hay token, continuar petición normal
  return next(req);
};

// Función para manejar errores 401
const handleUnauthorized = (router: Router) => {
  localStorage.removeItem('auth_token');
  router.navigate(['/login']);
};