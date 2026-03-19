import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdenService } from '../../../servidor/orden.service';
import { Orden } from '../../../models/ordenservicio/orden';
import { OrdenResponse } from '../../../models/ordenservicio/ordenrespuesta';
import { OrdenConDetalles } from '../../../models/ordenservicio/orden-detalle';
import { CommonModule } from '@angular/common';
import { BuscarOrdenRequest } from '../../../models/ordenservicio/BuscarOrdenRequest';
import { BuscarOrdenConDetalleResponse } from '../../../models/ordenservicio/BuscarOrdenConDetalleResponse';

@Component({
  selector: 'app-listarordenes',
  imports: [CommonModule],
  templateUrl: './listarordenes.component.html',
  styleUrl: './listarordenes.component.css',
})
export class ListarordenesComponent implements OnInit {

  // Variables
  cargandoDetalle = false;
  listadoOrdenServicio: Orden[] = [];
  idOrdenExpand: string | null = null;
  folioOrden: string | null = null;
  detalleOrden: OrdenConDetalles | null = null;
  ordenReq: BuscarOrdenRequest = new BuscarOrdenRequest();
  ordenConDetalleResponse: BuscarOrdenConDetalleResponse = new BuscarOrdenConDetalleResponse();
  orden: Orden = new Orden();

  constructor(private ordenService: OrdenService, private router: Router) { }

  ngOnInit(): void {
    this.listarOrdenesServicioComponent();
  }

  listarOrdenesServicioComponent() {
    this.ordenService.listarOrdenesServicio().subscribe({
      next: (response: OrdenResponse) => {
        this.listadoOrdenServicio = response.data;
      },
      error: (err) => console.error('Error:', err)
    });
  }

  nuevaOrden() {
    this.router.navigate(['/ordenes/crear']);
  }

  editarOrden(orden: Orden) {
    localStorage.setItem('idOrdenLocal', orden.idOrden.toString());
    localStorage.setItem('folioLocal', orden.folio.toString());
    this.router.navigate(['/ordenes/editar']);
  }

  eliminarOrden(orden: Orden) {
    if (!confirm(`¿Eliminar la orden ${orden.folio}?`)) return;

    this.ordenService.eliminarOrden({ idOrden: orden.idOrden, folio: orden.folio }).subscribe({
      next: () => this.listarOrdenesServicioComponent(),
      error: (err) => console.error('Error al eliminar:', err)
    });
  }

  // Mostrar detalle en la tabla "ListarOrdenes"

  toggleDetalle(orden: Orden) {
    if (this.idOrdenExpand === orden.idOrden) {
      this.idOrdenExpand = null;
      this.detalleOrden = null;
      return;
    }

    console.log(`Orden: ${orden.folio}`);
    this.idOrdenExpand = orden.idOrden;
    this.folioOrden = orden.folio;
    this.detalleOrden = null;
    this.cargandoDetalle = true;

    this.buscarOrdenConDetalle(orden.idOrden, orden.folio);


  }

  private buscarOrdenConDetalle(idOrdenExpand: string, folioOrden: string) {

    this.ordenReq.idOrden = idOrdenExpand;
    this.ordenReq.folio = folioOrden;

    // Invocar al service y llamar al endpoint del BKN
    this.ordenService.buscarOrdenConDetalle(this.ordenReq).subscribe(data => {
      this.ordenConDetalleResponse = data;

      if (data.success) {
        alert('Informacion obtenida');
        this.detalleOrden = data.data;
        console.log(this.detalleOrden);
      }
      else {
        alert(`No hay informacion para el folio ${folioOrden}`);
      }

    });
  }

}