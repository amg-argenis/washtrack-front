import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProcesoService } from '../../../servidor/proceso.service';
import { ActualizarProcesoRequest } from '../../../models/procesos/actualizar-proceso-request';
import { Proceso } from '../../../models/procesos/proceso';

@Component({
  selector: 'app-crear-proceso',
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-proceso.component.html',
  styleUrl: './editar-proceso.component.css'
})
export class EditarProcesoComponent {

  guardando = false;
  errorMsg = '';
  submitted = false;

  proceso: Proceso | null = null;

  procesoRequest: ActualizarProcesoRequest = {
    nombre: '',
    descripcion: '',
    preciounitario: 0,
    codigo: ''
  };

  ngOnInit() {
    const procesoLocal = localStorage.getItem('procesoLocal');
    if (!procesoLocal) {
      this.router.navigate(['/procesos/listar']);
      return;
    }

    // Convert JSON string to object
    this.proceso = JSON.parse(procesoLocal) as Proceso;

    this.procesoRequest.nombre = this.proceso.nombre || '';
    this.procesoRequest.descripcion = this.proceso.descripcion || '';
    this.procesoRequest.preciounitario = this.proceso.preciounitario;
    this.procesoRequest.codigo = this.proceso.codigo;

  }

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

  editar() {
    this.submitted = true;
    this.errorMsg = '';

    if (!this.formularioValido()) {
      this.errorMsg = 'Por favor capture y corrija los datos antes de continuar.';
      return;
    }

    this.guardando = true;

    this.procesoService.actualizarProceso(this.procesoRequest).subscribe({
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

