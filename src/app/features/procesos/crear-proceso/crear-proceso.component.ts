import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProcesoService } from '../../../servidor/proceso.service';
import { InsertarProcesoRequest } from '../../../models/procesos/insertar-proceso-request';

@Component({
  selector: 'app-crear-proceso',
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-proceso.component.html',
  styleUrl: './crear-proceso.component.css'
})
export class CrearProcesoComponent {

  guardando = false;
  errorMsg = '';
  submitted = false;

  procesoRequest: InsertarProcesoRequest = {
    nombre: '',
    descripcion: '',
    preciounitario: null
  };

  constructor(
    private procesoService: ProcesoService,
    private router: Router,
    private cdr: ChangeDetectorRef) { }

  formularioValido(): boolean {
    if (!this.procesoRequest.nombre.trim()) return false;
    if (this.procesoRequest.nombre.length > 100) return false;
    if (this.procesoRequest.descripcion && this.procesoRequest.descripcion.length > 500) return false;
    if (this.procesoRequest.preciounitario == null || this.procesoRequest.preciounitario <= 0) return false;
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

    this.procesoService.insertarProceso(this.procesoRequest).subscribe({
      next: (response) => {
        this.guardando = false;
        if (!response) {
          this.errorMsg = 'No se recibio respuesta del servidor.';
          this.cdr.detectChanges();
          return;
        }
        this.router.navigate(['/procesos/listar']);
      },
      error: (err) => {
        this.guardando = false;
        this.errorMsg = 'Error al crear el proceso. Verifica los datos.';
        console.error('Error al crear proceso:', err);
        this.cdr.detectChanges();
      }
    });
  }

  cancelar() {
    this.router.navigate(['/procesos/listar']);
  }
}
