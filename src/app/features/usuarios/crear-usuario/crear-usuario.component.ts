import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../servidor/usuario.service';
import { InsertarUsuarioRequest } from '../../../models/usuarios/insertar-usuario-request';

@Component({
  selector: 'app-crear-usuario',
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.css'
})
export class CrearUsuarioComponent {

  guardando = false;
  errorMsg = '';
  submitted = false;

  private readonly emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  usuarioRequest: InsertarUsuarioRequest = {
    tenantId: '',
    nombre: '',
    email: '',
    password: '',
    rol: ''
  };

  roles = ['ADMIN', 'OPERADOR', 'VIEWER'];

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private cdr: ChangeDetectorRef) { }

  // ----------------- Validaciones Formulario

  nombreVacio(): boolean {
    return !this.usuarioRequest.nombre.trim();
  }

  nombreLargo(): boolean {
    return this.usuarioRequest.nombre.length > 100;
  }

  emailVacio(): boolean {
    return !this.usuarioRequest.email.trim();
  }

  emailInvalido(): boolean {
    const email = this.usuarioRequest.email.trim();
    if (!email) return false; // se reporta como vacio
    return !this.emailRegex.test(email);
  }

  passwordInvalido(): boolean {
    return this.usuarioRequest.password.length < 8;
  }

  formularioValido(): boolean {
    if (this.nombreVacio() || this.nombreLargo()) return false;
    if (this.emailVacio() || this.emailInvalido()) return false;
    if (this.passwordInvalido()) return false;
    if (!this.usuarioRequest.rol) return false;
    return true;
  }

  guardar() {
    this.submitted = true;
    this.errorMsg = '';

    if (!this.formularioValido()) {
      this.errorMsg = 'Por favor capture y corrija los datos antes de continuar.';
      return;
    }

    this.guardando = true;

    this.usuarioService.insertarUsuario(this.usuarioRequest).subscribe({
      next: (response) => {
        this.guardando = false;
        if (!response) {
          this.errorMsg = 'No se recibio respuesta del servidor.';
          this.cdr.detectChanges();
          return;
        }
        if (response.success) {
          this.router.navigate(['/usuarios/listar']);
        } else {
          this.errorMsg = response.message || 'Error al crear el usuario.';
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        this.guardando = false;
        this.errorMsg = 'Error al crear el usuario. Verifica los datos.';
        console.error('Error al crear usuario:', err);
        this.cdr.detectChanges();
      }
    });
  }

  cancelar() {
    this.router.navigate(['/usuarios/listar']);
  }
}