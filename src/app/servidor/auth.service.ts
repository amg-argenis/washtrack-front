import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { LoginRequest } from '../models/auth/login-request';
import { LoginResponse } from '../models/auth/login-response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = '/washtrack/api/v1';

  constructor(private http: HttpClient, private router: Router) { }

  login(request: LoginRequest): Observable<LoginResponse | null> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/usuarios/login`,
      request,
      { observe: 'response' }  // 👈 agrega esto
    ).pipe(
      map(response => {
        if (response.status === 204 || !response.body) return null;
        return response.body;
      })
    );
  }

  guardarSesion(response: LoginResponse) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('nombre', response.data.nombre);
    localStorage.setItem('email', response.data.email);
    localStorage.setItem('rol', response.data.rol);
    localStorage.setItem('tenantId', response.data.tenantId);
    localStorage.setItem('nombreTenant', response.data.nombreTenant);
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    localStorage.removeItem('email');
    localStorage.removeItem('rol');
    localStorage.removeItem('tenantId');
    localStorage.removeItem('nombreTenant');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getNombre(): string | null {
    return localStorage.getItem('nombre');
  }

  getRol(): string | null {
    return localStorage.getItem('rol');
  }

  getNombreTenant(): string | null {
    return localStorage.getItem('nombreTenant');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

}