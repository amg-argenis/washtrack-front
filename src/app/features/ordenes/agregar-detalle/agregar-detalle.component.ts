import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DetalleOrdenService } from '../../../servidor/detalle-orden.service';
import { InsertarDetalleOrdenRequest } from '../../../models/detalleorden/insertar-detalle-orden-request';
import { DetalleOrden } from '../../../models/detalleorden/detalle-orden';

@Component({
  selector: 'app-agregar-detalle',
  imports: [FormsModule, CommonModule],
  templateUrl: './agregar-detalle.component.html',
  styleUrl: './agregar-detalle.component.css'
})
export class AgregarDetalleComponent implements OnInit {

  folio: string = '';
  idOrden: string = '';
  guardando = false;
  errorMsg = '';
  detallesAgregados: DetalleOrden[] = [];

  detalleRequest: InsertarDetalleOrdenRequest = {
    ordenId: '',
    procesoId: '',
    tipoPrenda: '',
    cantidad: 1,
    colorReferencia: ''
  };

  procesos = [
    { id: 'p0000001-0000-0000-0000-000000000001', nombre: 'Lavado en seco' },
    { id: 'p0000001-0000-0000-0000-000000000002', nombre: 'Lavado industrial' },
    { id: 'p0000001-0000-0000-0000-000000000003', nombre: 'Planchado' },
    { id: 'p0000001-0000-0000-0000-000000000004', nombre: 'Desmanchado' },
    { id: 'p0000001-0000-0000-0000-000000000005', nombre: 'Barrido natural' }
  ];

  constructor(
    private detalleOrdenService: DetalleOrdenService,
    private router: Router,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.idOrden = localStorage.getItem('idOrdenLocal') || '';
    this.folio = localStorage.getItem('folioLocal') || '';

    if (!this.idOrden) {
      this.router.navigate(['/ordenes/listar']);
      return;
    }

    this.detalleRequest.ordenId = this.idOrden;
  }

  agregarDetalle() {
    this.guardando = true;
    this.errorMsg = '';

    this.detalleOrdenService.insertarDetalle(this.detalleRequest).subscribe({
      next: (data) => {
        this.guardando = false;
        if (!data) {
          this.errorMsg = 'No se recibio respuesta del servidor.';
          return;
        }
        this.detallesAgregados.push(data.data);
        this.detalleRequest = {
          ordenId: this.idOrden,
          procesoId: '',
          tipoPrenda: '',
          cantidad: 1,
          colorReferencia: ''
        };
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.guardando = false;
        this.errorMsg = 'Error al agregar el detalle.';
        console.error('Error al agregar detalle:', err);
      }
    });
  }

  terminar() {
    this.router.navigate(['/ordenes/listar']);
  }

  getNombreProceso(procesoId: string): string {
    const proceso = this.procesos.find(p => p.id === procesoId);
    return proceso ? proceso.nombre : procesoId;
  }

}