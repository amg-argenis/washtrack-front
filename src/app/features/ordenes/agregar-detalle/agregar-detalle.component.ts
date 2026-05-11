import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DetalleOrdenService } from '../../../servidor/detalle-orden.service';
import { InsertarDetalleOrdenRequest } from '../../../models/detalleorden/insertar-detalle-orden-request';
import { DetalleOrden } from '../../../models/detalleorden/detalle-orden';
import { Proceso } from '../../../models/procesos/proceso';
import { ProcesoService } from '../../../servidor/proceso.service';
import { ProcesoResponse } from '../../../models/procesos/proceso-response';

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

  procesosListado: Proceso[] = [];

  constructor(
    private detalleOrdenService: DetalleOrdenService,
    private procesoService: ProcesoService,
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

    // Request para obtener listado de procesos
    this.obtenerListadoProcesos();

  }

  obtenerListadoProcesos() {
    this.procesoService.listarProcesos().subscribe({
      next: (response: ProcesoResponse | null) => {
        if (!response) {
          this.errorMsg = 'No se recibio respuesta del servidor para listado de procesos.';
          this.procesosListado = [];
          return;
        }
        // Handle both array and single object
        this.procesosListado = Array.isArray(response.data)
          ? response.data
          : [response.data];

        console.log(this.procesosListado);
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.guardando = false;
        this.errorMsg = 'Error al obtener el listado de procesos de lavado.';
        console.error('Error al obtener procesos, Detalles: ', err);
      }
    });
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
    const proceso = this.procesosListado.find(p => p.idproceso === procesoId);
    return proceso ? proceso.nombre : procesoId;
  }

}