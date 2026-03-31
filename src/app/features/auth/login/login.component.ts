import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../servidor/auth.service';
import { LoginRequest } from '../../../models/auth/login-request';
import { LoginResponse } from '../../../models/auth/login-response';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginRequest: LoginRequest = {
    email: '',
    password: ''
  };

  cargando = false;
  errorMsg = '';

  constructor(
    private authService: AuthService,
    private router: Router) { }


  iniciarSesion() {
    this.cargando = true;
    this.errorMsg = '';

    this.authService.login(this.loginRequest).subscribe({
      next: (response: LoginResponse | null) => {
        this.cargando = false;

        if (!response) {
          this.errorMsg = 'No se recibio respuesta del servidor.';
          return;
        }

        if (response.success) {
          this.authService.guardarSesion(response);
          this.router.navigate(['/ordenes/listar']);
        } else {
          this.errorMsg = 'Credenciales incorrectas, intenta de nuevo.';
        }
      },
      error: (err) => {
        this.cargando = false;
        this.errorMsg = 'Error al iniciar sesion. Verifica tus datos.';
        console.error('Error login:', err);
      }
    });
  }

}
