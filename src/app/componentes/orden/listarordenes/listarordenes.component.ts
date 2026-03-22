import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdenService } from '../../../servidor/orden.service';
import { Orden } from '../../../models/ordenservicio/orden';
import { OrdenResponse } from '../../../models/ordenservicio/ordenrespuesta';
import { OrdenConDetalles } from '../../../models/ordenservicio/orden-detalle';
import { CommonModule } from '@angular/common';
import { BuscarOrdenRequest } from '../../../models/ordenservicio/BuscarOrdenRequest';
import { BuscarOrdenConDetalleResponse } from '../../../models/ordenservicio/BuscarOrdenConDetalleResponse';
import { EliminarOrdenRequest } from '../../../models/ordenservicio/EliminarOrdenRequest';

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

  constructor(
    private ordenService: OrdenService,
    private router: Router,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.listarOrdenesServicioComponent();
  }

  listarOrdenesServicioComponent() {
    this.ordenService.listarOrdenesServicio().subscribe({
      next: (response: OrdenResponse | null) => {
        if (!response) {
          this.listadoOrdenServicio = [];
          this.cdr.detectChanges();
          return;
        }
        this.listadoOrdenServicio = response.data;
        this.cdr.detectChanges();
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

    const eliminarRequest: EliminarOrdenRequest = {
      idOrden: orden.idOrden,
      folio: orden.folio
    };


    this.ordenService.eliminarOrden(eliminarRequest).subscribe({
      next: () => this.listarOrdenesServicioComponent(),
      error: (err) => console.error('Error al eliminar:', err)
    });
  }

  // Mostrar detalle en la tabla "ListarOrdenes"
  toggleDetalle(orden: Orden) {

    if (this.idOrdenExpand === orden.idOrden) {
      this.idOrdenExpand = null;
      this.detalleOrden = null;
      console.log('Contraer el detalle de la orden servicio.');
      return;
    }

    console.log(`Orden: ${orden.folio}`);
    this.idOrdenExpand = orden.idOrden;
    this.folioOrden = orden.folio;
    this.detalleOrden = null;
    this.cargandoDetalle = true;

    this.buscarOrdenConDetalleComponent(orden.idOrden, orden.folio);


  }

  // Metodo para buscar la orden con detalle
  private buscarOrdenConDetalleComponent(idOrdenExpand: string, folioOrden: string) {

    this.ordenReq.idOrden = idOrdenExpand;
    this.ordenReq.folio = folioOrden;

    this.ordenService.buscarOrdenConDetalle(this.ordenReq).subscribe({
      next: (data) => {
        if (!data) {
          // 204 - sin contenido
          this.detalleOrden = null;
          this.cargandoDetalle = false;
          this.cdr.detectChanges();
          return;
        }

        this.ordenConDetalleResponse = data;

        if (data.success) {
          this.detalleOrden = data.data;
        } else {
          this.detalleOrden = null;
          alert(`No hay informacion para el folio ${folioOrden}`);
        }

        this.cargandoDetalle = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.cargandoDetalle = false;
        this.cdr.detectChanges();
        console.error(`La orden '${folioOrden}' no cuenta con detalle.`);
      }
    });

  }

  getSumaPrendasDetalle(): number {
    if (!this.detalleOrden?.ordenesDetalleDto) return 0;
    return this.detalleOrden.ordenesDetalleDto.reduce((acc, p) => acc + (p.cantidad || 0), 0);
  }

  hayDiscrepanciaPrendas(): boolean {
    if (!this.detalleOrden) return false;
    return this.getSumaPrendasDetalle() !== this.detalleOrden.totalPrendas;
  }

}