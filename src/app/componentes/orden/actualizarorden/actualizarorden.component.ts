import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrdenService } from '../../../servidor/orden.service';
import { ActualizarOrdenRequest } from '../../../models/ordenservicio/actualizar-orden-request';
import { Orden } from '../../../models/ordenservicio/orden';
import { BuscarOrdenRequest } from '../../../models/ordenservicio/BuscarOrdenRequest';
import { BuscarOrdenResponse } from '../../../models/ordenservicio/BuscarOrdenResponse';

@Component({
  selector: 'app-editarorden',
  imports: [FormsModule],
  templateUrl: './actualizarorden.component.html',
  styleUrl: './actualizarorden.component.css',
})
export class ActualizarordenComponent implements OnInit {

  ordenCrearActualizar: ActualizarOrdenRequest = {
    idOrden: '',
    clienteId: '',
    folio: '',
    fechaIngreso: '',
    estado: '',
    totalPrendas: 1,
    observaciones: '',
    fechaEntrega: ''
  };

  estados = ['RECIBIDO', 'EN_PROCESO', 'LISTO', 'ENTREGADO'];
  guardando = false;
  errorMsg = '';

  // Variables
  ordenReq: BuscarOrdenRequest = new BuscarOrdenRequest();
  ordenResponse: BuscarOrdenResponse = new BuscarOrdenResponse();
  orden: Orden = new Orden();

  constructor(
    private ordenService: OrdenService,
    private router: Router,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.buscarOrdenServicio();
  }



  buscarOrdenServicio() {
    let idorden = localStorage.getItem('idOrdenLocal');
    let folio = localStorage.getItem('folioLocal');

    this.ordenReq.idOrden = String(idorden);
    this.ordenReq.folio = String(folio);

    this.ordenService.buscarOrden(this.ordenReq).subscribe({
      next: (data: BuscarOrdenResponse | null) => {
        if (!data) {
          alert(`No hay informacion para el folio ${folio}`);
          this.cdr.detectChanges();
          return;
        }

        this.ordenResponse = data;

        if (data.success) {
          this.orden = data.data;

          // Mapear los datos al request de actualizacion
          this.ordenCrearActualizar.idOrden = this.orden.idOrden;
          this.ordenCrearActualizar.clienteId = this.orden.clienteId;
          this.ordenCrearActualizar.folio = this.orden.folio;
          this.ordenCrearActualizar.fechaIngreso = this.orden.fechaIngreso;
          this.ordenCrearActualizar.estado = this.orden.estado;
          this.ordenCrearActualizar.totalPrendas = this.orden.totalPrendas;
          this.ordenCrearActualizar.observaciones = this.orden.observaciones;
          this.ordenCrearActualizar.fechaEntrega = this.orden.fechaEntrega;

          this.cdr.detectChanges();
        } else {
          alert(`No hay informacion para el folio ${folio}`);
        }
      },
      error: (err) => {
        this.cdr.detectChanges();
        console.error('Error al obtener la orden de servicio:', err);
      }
    });
  }

  guardar() {
    this.guardando = true;

    this.ordenService.actualizarOrden(this.ordenCrearActualizar).subscribe({
      next: (data) => {
        this.guardando = false;
        if (!data) {
          this.errorMsg = 'Alerta! | No se recibio respuesta del servidor !';
          alert('Alerta! | No se recibio respuesta del servidor !');
          return;
        }

        this.errorMsg = 'Exito | Orden de servicio actualizada correctamente.';
        alert('Exito | Orden de servicio actualizada correctamente.');
        this.router.navigate(['/ordenes/listar']);

      },
      error: (err) => {
        this.guardando = false;
        this.errorMsg = 'Alerta! | Error al actualizar la orden. Verifica los datos.';
        alert('Alerta! | Error al actualizar la orden. Verifica los datos.');
        console.error(err);
      }
    });
  }

  cancelar() {
    this.router.navigate(['/ordenes/listar']);
  }
}
