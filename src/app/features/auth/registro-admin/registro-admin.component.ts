import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../servidor/usuario.service';

@Component({
  selector: 'app-registro-admin',
  imports: [FormsModule, CommonModule],
  templateUrl: './registro-admin.component.html',
  styleUrl: './registro-admin.component.css'
})
export class RegistroAdminComponent implements OnInit {

  guardando = false;
  errorMsg = '';
  submitted = false;
  nombreEmpresa = '';

  private readonly emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  adminRequest = {
    tenantId: '',
    nombre: '',
    email: '',
    password: '',
    rol: 'ADMIN'
  };

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    const tenantId = localStorage.getItem('newTenantId');
    const nombreTenant = localStorage.getItem('newTenantNombre');

    if (!tenantId) {
      this.router.navigate(['/registro']);
      return;
    }

    this.adminRequest.tenantId = tenantId;
    this.nombreEmpresa = nombreTenant || '';
  }

  // ----------------- Validaciones Formulario

  nombreVacio(): boolean {
    return !this.adminRequest.nombre.trim();
  }

  nombreLargo(): boolean {
    return this.adminRequest.nombre.length > 100;
  }

  emailVacio(): boolean {
    return !this.adminRequest.email.trim();
  }

  emailInvalido(): boolean {
    const email = this.adminRequest.email.trim();
    if (!email) return false; // se reporta como vacio
    return !this.emailRegex.test(email);
  }

  passwordInvalido(): boolean {
    return this.adminRequest.password.length < 8;
  }

  formularioValido(): boolean {
    if (this.nombreVacio() || this.nombreLargo()) return false;
    if (this.emailVacio() || this.emailInvalido()) return false;
    if (this.passwordInvalido()) return false;
    return true;
  }

  registrar() {
    this.submitted = true;
    this.errorMsg = '';

    if (!this.formularioValido()) {
      this.errorMsg = 'Por favor capture y corrija los datos antes de continuar.';
      return;
    }

    this.guardando = true;

    this.usuarioService.insertarUsuario(this.adminRequest).subscribe({
      next: (response) => {
        this.guardando = false;
        if (!response) {
          this.errorMsg = 'No se recibio respuesta del servidor.';
          this.cdr.detectChanges();
          return;
        }
        if (response.success) {
          // Clean localStorage
          localStorage.removeItem('newTenantId');
          localStorage.removeItem('newTenantNombre');
          // Redirect to step 3
          this.router.navigate(['/registro/listo']);
        } else {
          this.errorMsg = response.message || 'Error al crear el administrador.';
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        this.guardando = false;
        this.errorMsg = 'Error al crear el administrador. Intenta de nuevo.';
        console.error('Error al registrar admin:', err);
        this.cdr.detectChanges();
      }
    });
  }

  volverAtras() {
    this.router.navigate(['/registro']);
  }
}