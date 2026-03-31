import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { errorInterceptor } from './servidor/error-interceptor';
import { authInterceptor } from './servidor/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideHttpClient(withInterceptors([
      errorInterceptor,
      authInterceptor,  // 👈 agrega el token en cada request
      errorInterceptor  // 👈 maneja errores globales
    ])),

  ]
};
