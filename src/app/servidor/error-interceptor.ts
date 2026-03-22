import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 500) {
        alert('❌ Error interno del servidor. Intenta más tarde.');
      } else if (err.status === 404) {
        alert('❌ Recurso no encontrado.');
      } else if (err.status === 0) {
        alert('❌ Sin conexión al servidor. Verifica que el backend esté corriendo.');
      } else {
        alert('❌ Hubo un error en el servidor, contacta al administrador.');
      }

      console.error(`Error ${err.status}:`, err.message);
      return throwError(() => err);
    })
  );
};