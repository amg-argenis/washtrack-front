import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdenService } from '../../../servidor/orden.service';
import { Orden } from '../../../models/ordenservicio/orden';
import { OrdenResponse } from '../../../models//ordenservicio/ordenrespuesta';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarordenes',
  imports: [CommonModule],
  templateUrl: './listarordenes.component.html',
  styleUrl: './listarordenes.component.css',
})
export class ListarordenesComponent implements OnInit {
  listadoOrdenServicio: Orden[] = [];

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

}
