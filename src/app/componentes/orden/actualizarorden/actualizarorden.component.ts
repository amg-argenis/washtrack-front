import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrdenService } from '../../../servidor/orden.service';
import { DetalleOrdenService } from '../../../servidor/detalle-orden.service';
import { ActualizarOrdenRequest } from '../../../models/ordenservicio/actualizar-orden-request';
import { BuscarOrdenRequest } from '../../../models/ordenservicio/BuscarOrdenRequest';
import { BuscarOrdenConDetalleResponse } from '../../../models/ordenservicio/BuscarOrdenConDetalleResponse';
import { OrdenConDetalles, OrdenDetalleDto } from '../../../models/ordenservicio/orden-detalle';
import { InsertarDetalleOrdenRequest } from '../../../models/detalleorden/insertar-detalle-orden-request';
import { Proceso } from '../../../models/procesos/proceso';
import { ProcesoService } from '../../../servidor/proceso.service';
import { ProcesoResponse } from '../../../models/procesos/proceso-response';

@Component({
  selector: 'app-editarorden',
  imports: [FormsModule, CommonModule],
  templateUrl: './actualizarorden.component.html',
  styleUrl: './actualizarorden.component.css',
})
export class ActualizarordenComponent implements OnInit {

  ordenCrearActualizar: ActualizarOrdenRequest = {
    idOrden: '', clienteId: '', nombreCliente: '', folio: '', fechaIngreso: '',
    estado: '', totalPrendas: 1, observaciones: '', fechaEntrega: ''
  };

  estados = ['RECIBIDO', 'EN_PROCESO', 'LISTO', 'ENTREGADO'];
  guardando = false;
  errorMsg = '';
  ordenConDetalles: OrdenConDetalles | null = null;

  // Nuevo detalle
  agregandoDetalle = false;
  guardandoDetalle = false;
  nuevoDetalle: InsertarDetalleOrdenRequest = {
    ordenId: '', procesoId: '', tipoPrenda: '', cantidad: 1, colorReferencia: ''
  };

  procesosListado: Proceso[] = [];

  constructor(
    private ordenService: OrdenService,
    private detalleOrdenService: DetalleOrdenService,
    private procesoService: ProcesoService,
    private router: Router,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cargarOrdenConDetalle();
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

  cargarOrdenConDetalle() {
    const idOrden = localStorage.getItem('idOrdenLocal');
    const folio = localStorage.getItem('folioLocal');

    if (!idOrden || !folio) {
      this.router.navigate(['/ordenes/listar']);
      return;
    }

    const request: BuscarOrdenRequest = {
      idOrden: idOrden,
      folio: folio
    };

    this.ordenService.buscarOrdenConDetalle(request).subscribe({
      next: (data: BuscarOrdenConDetalleResponse | null) => {
        if (!data) {
          alert('No hay informacion para esta orden.');
          this.cdr.detectChanges();
          return;
        }

        if (data.success) {
          this.ordenConDetalles = data.data;

          // Mapear al request de actualizacion
          this.ordenCrearActualizar.idOrden = data.data.idOrden;
          this.ordenCrearActualizar.clienteId = data.data.clienteId;
          this.ordenCrearActualizar.nombreCliente = data.data.nombreCliente;
          this.ordenCrearActualizar.folio = data.data.folio;
          this.ordenCrearActualizar.fechaIngreso = data.data.fechaIngreso;
          this.ordenCrearActualizar.estado = data.data.estado;
          this.ordenCrearActualizar.totalPrendas = data.data.totalPrendas;
          this.ordenCrearActualizar.observaciones = data.data.observaciones;
          this.ordenCrearActualizar.fechaEntrega = data.data.fechaEntrega || '';

          this.nuevoDetalle.ordenId = data.data.idOrden;
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        this.cdr.detectChanges();
        console.error('Error al obtener la orden:', err);
      }
    });
  }

  guardar() {
    this.guardando = true;
    this.errorMsg = '';

    this.ordenService.actualizarOrden(this.ordenCrearActualizar).subscribe({
      next: (data) => {
        this.guardando = false;
        if (!data) {
          this.errorMsg = 'No se recibio respuesta del servidor.';
          return;
        }
        this.router.navigate(['/ordenes/listar']);
      },
      error: (err) => {
        this.guardando = false;
        this.errorMsg = 'Error al actualizar la orden.';
        console.error(err);
      }
    });
  }

  mostrarFormDetalle() {
    this.agregandoDetalle = true;
    this.nuevoDetalle = {
      ordenId: this.ordenCrearActualizar.idOrden,
      procesoId: '', tipoPrenda: '', cantidad: 1, colorReferencia: ''
    };
  }

  cancelarDetalle() {
    this.agregandoDetalle = false;
  }

  guardarDetalle() {
    this.guardandoDetalle = true;

    this.detalleOrdenService.insertarDetalle(this.nuevoDetalle).subscribe({
      next: (data) => {
        this.guardandoDetalle = false;
        if (!data) return;
        // Agregar el nuevo detalle a la lista local
        if (this.ordenConDetalles) {
          this.ordenConDetalles.ordenesDetalleDto.push(data.data);
        }
        this.agregandoDetalle = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.guardandoDetalle = false;
        console.error('Error al agregar detalle:', err);
      }
    });
  }

  eliminarDetalle(detalle: OrdenDetalleDto) {
    if (!confirm(`Eliminar el detalle de la orden '${detalle.tipoPrenda}' ?`)) return;

    this.detalleOrdenService.eliminarDetalle({
      idDetalleOrden: detalle.idDetalleOrden,
      ordenId: detalle.ordenId
    }).subscribe({
      next: () => {
        if (this.ordenConDetalles) {
          this.ordenConDetalles.ordenesDetalleDto =
            this.ordenConDetalles.ordenesDetalleDto.filter(
              d => d.idDetalleOrden !== detalle.idDetalleOrden
            );
        }
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al eliminar detalle:', err)
    });
  }

  getNombreProceso(procesoId: string): string {
    const proceso = this.procesosListado.find(p => p.idproceso === procesoId);
    return proceso ? proceso.nombre : procesoId;
  }

  cancelar() {
    this.router.navigate(['/ordenes/listar']);
  }
}