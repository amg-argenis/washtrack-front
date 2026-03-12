import { Component, OnInit } from '@angular/core';
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

  ordenCrear: ActualizarOrdenRequest = {
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

  constructor(private ordenService: OrdenService, private router: Router) { }

  ngOnInit(): void {
    this.buscarOrdenServicio();
  }

  buscarOrdenServicio() {
    let idorden = localStorage.getItem('idOrdenLocal');
    let folio = localStorage.getItem('folioLocal');

    this.ordenReq.idOrden = String(idorden);
    this.ordenReq.folio = String(folio);

    // Invocar al service y llamar al endpoint del BKN
    this.ordenService.buscarOrden(this.ordenReq).subscribe(data => {
      this.ordenResponse = data;

      if (data.success) {
        alert('Informacion obtenida');
        this.orden = data.data;
      }
      else {
        alert(`No hay informacion para el folio ${folio}`);
      }

    });
  }

  guardar() {
    this.guardando = true;
    this.errorMsg = '';

    this.ordenService.actualizarOrden(this.ordenCrear).subscribe({
      next: () => {
        this.guardando = false;
        this.router.navigate(['/ordenes/listar']);
      },
      error: (err) => {
        this.guardando = false;
        this.errorMsg = 'Error al actualizar la orden. Verifica los datos.';
        console.error(err);
      }
    });
  }

  cancelar() {
    this.router.navigate(['/ordenes/listar']);
  }
}
