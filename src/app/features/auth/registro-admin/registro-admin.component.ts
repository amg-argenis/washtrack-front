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
  nombreEmpresa = '';

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

  registrar() {
    this.guardando = true;
    this.errorMsg = '';

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