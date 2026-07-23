import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const rol = authService.getRol();

  if (rol === 'ADMIN') {
    return true;
  }

  router.navigate(['/inicio']);
  return false;
};

export const operadorGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const rol = authService.getRol();

  if (rol === 'ADMIN' || rol === 'OPERADOR') {
    return true;
  }

  router.navigate(['/inicio']);
  return false;
};