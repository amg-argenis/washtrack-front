import { HttpInterceptorFn } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  // No agregar token al endpoint de login
  if (req.url.includes('/usuarios/login')) {
    // console.log('URL completa:', req.url);
    // console.log('Method:', req.method);
    // console.log('Body:', req.body);
    // console.log('Headers:', req.headers.keys());
    const reqConHeader = req.clone({
      setHeaders: {
        'Content-Type': 'application/json'
      }
    });
    return next(reqConHeader);
  }

  if (token) {
    const reqConToken = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(reqConToken);
  }

  return next(req);
};