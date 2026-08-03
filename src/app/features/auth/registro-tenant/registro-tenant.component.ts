import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TenantService } from '../../../servidor/tenant.service';
import { InsertarTenantRequest } from '../../../models/tenant/insertar-tenant-request';

@Component({
  selector: 'app-registro-tenant',
  imports: [FormsModule, CommonModule],
  templateUrl: './registro-tenant.component.html',
  styleUrl: './registro-tenant.component.css'
})
export class RegistroTenantComponent {

  guardando = false;
  errorMsg = '';
  submitted = false;

  tenantRequest: InsertarTenantRequest = {
    nombre: ''
  };

  constructor(
    private tenantService: TenantService,
    private router: Router,
    private cdr: ChangeDetectorRef) { }

  // ----------------- Validaciones Formulario

  nombreVacio(): boolean {
    return !this.tenantRequest.nombre.trim();
  }

  nombreLargo(): boolean {
    return this.tenantRequest.nombre.length > 100;
  }

  formularioValido(): boolean {
    if (this.nombreVacio() || this.nombreLargo()) return false;
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

    this.tenantService.insertarTenant(this.tenantRequest).subscribe({
      next: (response) => {
        this.guardando = false;
        if (!response) {
          this.errorMsg = 'No se recibio respuesta del servidor.';
          this.cdr.detectChanges();
          return;
        }
        if (response.success) {
          // Save tenantId for next step
          const tenant = Array.isArray(response.data) ? response.data[0] : response.data;
          localStorage.setItem('newTenantId', tenant.idtenant);
          localStorage.setItem('newTenantNombre', tenant.nombre);
          // Redirect to admin registration
          this.router.navigate(['/registro/admin']);
        } else {
          this.errorMsg = response.message || 'Error al registrar la empresa.';
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        this.guardando = false;
        this.errorMsg = 'Error al registrar la empresa. Intenta de nuevo.';
        console.error('Error al registrar tenant:', err);
        this.cdr.detectChanges();
      }
    });
  }

  irALogin() {
    this.router.navigate(['/login']);
  }
}