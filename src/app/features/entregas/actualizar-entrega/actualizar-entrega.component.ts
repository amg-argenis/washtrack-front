import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EntregaService } from '../../../servidor/entrega.service';
import { ActualizarEntregaRequest } from '../../../models/entregas/actualizar-entrega-request';
import { Entrega } from '../../../models/entregas/entrega';

@Component({
  selector: 'app-actualizar-entrega',
  imports: [FormsModule, CommonModule],
  templateUrl: './actualizar-entrega.component.html',
  styleUrl: './actualizar-entrega.component.css'
})
export class ActualizarEntregaComponent implements OnInit {

  guardando = false;
  errorMsg = '';
  submitted = false;
  folio: string = '';
  cliente: string = '';

  entregaRequest: ActualizarEntregaRequest = {
    idEntrega: '',
    ordenId: '',
    tipo: '',
    fechaEntrega: '',
    totalEntregado: null,
    conformidadCliente: null,
    observaciones: '',
    estado: ''
  };

  tipos = ['PARCIAL', 'COMPLETO'];

  constructor(
    private entregaService: EntregaService,
    private router: Router,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    const entregaLocal = localStorage.getItem('entregaLocal');

    if (!entregaLocal) {
      this.router.navigate(['/entregas/listar']);
      return;
    }

    // Convert JSON string to object
    const entrega = JSON.parse(entregaLocal) as Entrega;

    this.folio = entrega.folio;
    this.cliente = entrega.cliente;

    this.entregaRequest.idEntrega = entrega.idEntrega;
    this.entregaRequest.ordenId = entrega.ordenId;
    this.entregaRequest.tipo = entrega.tipo || '';
    this.entregaRequest.fechaEntrega = (entrega.fechaEntrega || '').substring(0, 10);
    this.entregaRequest.totalEntregado = entrega.totalEntregado;
    this.entregaRequest.conformidadCliente = entrega.conformidadCliente;
    this.entregaRequest.observaciones = entrega.observaciones || '';
    this.entregaRequest.estado = entrega.estado;
  }

  formularioValido(): boolean {
    if (!this.entregaRequest.tipo) return false;
    if (!this.entregaRequest.fechaEntrega) return false;
    if (this.entregaRequest.totalEntregado == null || this.entregaRequest.totalEntregado < 1) return false;
    if (this.entregaRequest.conformidadCliente == null) return false;
    return true;
  }

  guardar() {
    this.submitted = true;
    this.errorMsg = '';

    if (!this.formularioValido()) {
      this.errorMsg = 'Por favor corrige los errores antes de continuar.';
      return;
    }

    this.guardando = true;

    const request: ActualizarEntregaRequest = { ...this.entregaRequest };

    this.entregaService.actualizarEntrega(request).subscribe({
      next: (data) => {
        this.guardando = false;
        if (!data) {
          this.errorMsg = 'No se recibio respuesta del servidor.';
          this.cdr.detectChanges();
          return;
        }
        this.router.navigate(['/entregas/listar']);
      },
      error: (err) => {
        this.guardando = false;
        this.errorMsg = 'Error al actualizar la entrega. Verifica los datos.';
        console.error('Error al actualizar entrega:', err);
        this.cdr.detectChanges();
      }
    });
  }

  cancelar() {
    this.router.navigate(['/entregas/listar']);
  }
}
