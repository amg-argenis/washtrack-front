import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EntregaService } from '../../../servidor/entrega.service';
import { InsertarEntregaRequest } from '../../../models/entregas/insertar-entrega-request';

@Component({
  selector: 'app-registrar-entrega',
  imports: [FormsModule, CommonModule],
  templateUrl: './registrar-entrega.component.html',
  styleUrl: './registrar-entrega.component.css'
})
export class RegistrarEntregaComponent implements OnInit {

  guardando = false;
  errorMsg = '';
  ordenId: string = '';
  folio: string = '';

  entregaRequest: InsertarEntregaRequest = {
    ordenId: '',
    tipo: 'PARCIAL',
    fechaEntrega: '',
    totalEntregado: 1,
    conformidadCliente: false,
    observaciones: ''
  };

  tipos = ['PARCIAL', 'COMPLETO'];

  constructor(
    private entregaService: EntregaService,
    private router: Router,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.ordenId = localStorage.getItem('idOrdenLocal') || '';
    this.folio = localStorage.getItem('folioLocal') || '';

    if (!this.ordenId) {
      this.router.navigate(['/ordenes/listar']);
      return;
    }

    this.entregaRequest.ordenId = this.ordenId;
  }

  guardar() {
    this.guardando = true;
    this.errorMsg = '';

    this.entregaService.insertarEntrega(this.entregaRequest).subscribe({
      next: (data) => {
        this.guardando = false;
        if (!data) {
          this.errorMsg = 'No se recibio respuesta del servidor.';
          return;
        }
        this.router.navigate(['/entregas/listar']);
      },
      error: (err) => {
        this.guardando = false;
        this.errorMsg = 'Error al registrar la entrega. Verifica los datos.';
        console.error('Error al registrar entrega:', err);
      }
    });
  }

  cancelar() {
    this.router.navigate(['/entregas/listar']);
  }
}