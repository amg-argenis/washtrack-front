import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../servidor/usuario.service';
import { ActualizarUsuarioRequest } from '../../../models/usuarios/actualizar-usuario-request';
import { Usuario } from '../../../models/usuarios/usuario';

@Component({
  selector: 'app-editar-usuario',
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css'
})
export class EditarUsuarioComponent implements OnInit {

  guardando = false;
  errorMsg = '';
  submitted = false;
  roles = ['ADMIN', 'OPERADOR', 'VIEWER'];

  private readonly emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  usuarioRequest: ActualizarUsuarioRequest = {
    idUsuario: '',
    nombre: '',
    email: '',
    password: '',
    rol: ''
  };

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    const usuarioLocal = localStorage.getItem('usuarioLocal');

    if (!usuarioLocal) {
      this.router.navigate(['/usuarios/listar']);
      return;
    }

    const usuario = JSON.parse(usuarioLocal) as Usuario;

    this.usuarioRequest = {
      idUsuario: usuario.idUsuario,
      nombre: usuario.nombre || '',
      email: usuario.email || '',
      password: '',
      rol: usuario.rol || ''
    };
  }

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
    // Opcional: en blanco significa que no se cambia la contrasena
    if (!this.usuarioRequest.password) return false;
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

    this.usuarioService.actualizarUsuario(this.usuarioRequest).subscribe({
      next: (response) => {
        this.guardando = false;
        if (!response) {
          this.errorMsg = 'No se recibio respuesta del servidor.';
          this.cdr.detectChanges();
          return;
        }
        if (response.success) {
          localStorage.removeItem('usuarioLocal');
          this.router.navigate(['/usuarios/listar']);
        } else {
          this.errorMsg = response.message || 'Error al actualizar el usuario.';
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        this.guardando = false;
        this.errorMsg = 'Error al actualizar el usuario. Verifica los datos.';
        console.error('Error al actualizar usuario:', err);
        this.cdr.detectChanges();
      }
    });
  }

  cancelar() {
    localStorage.removeItem('usuarioLocal');
    this.router.navigate(['/usuarios/listar']);
  }
}