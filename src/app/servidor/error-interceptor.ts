import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        // Token expirado o inválido — cerrar sesión y redirigir al login
        authService.cerrarSesion();
      } else if (err.status === 500) {
        alert('❌ Error interno del servidor. Intenta más tarde.');
      } else if (err.status === 404) {
        alert('❌ Recurso no encontrado.');
      } else if (err.status === 0) {
        alert('❌ Sin conexión al servidor. Verifica tu conexión.');
      }

      console.error(`Error ${err.status}:`, err.message);
      return throwError(() => err);
    })
  );
};