import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/auth/login-request';
import { LoginResponse } from '../models/auth/login-response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = '/washtrack/api/v1';

  constructor(private http: HttpClient, private router: Router) { }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/usuarios/login`,
      { body: request } as any
    );
  }

  guardarSesion(response: LoginResponse) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('nombre', response.data.nombre);
    localStorage.setItem('email', response.data.email);
    localStorage.setItem('rol', response.data.rol);
    localStorage.setItem('tenantId', response.data.tenantId);
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    localStorage.removeItem('email');
    localStorage.removeItem('rol');
    localStorage.removeItem('tenantId');
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

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

}