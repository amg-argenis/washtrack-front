import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EntregaService } from '../../../servidor/entrega.service';
import { Entrega } from '../../../models/entregas/entrega';
import { EliminarEntregaRequest } from '../../../models/entregas/eliminar-entrega-request';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-entregas',
  imports: [CommonModule, FormsModule],
  templateUrl: './listar-entregas.component.html',
  styleUrl: './listar-entregas.component.css'
})
export class ListarEntregasComponent implements OnInit {

  listadoEntregas: Entrega[] = [];
  registros: number = 0;

  // filtered list for display
  listadoFiltrado: Entrega[] = [];
  // pagination properties
  paginaActual: number = 1;
  registrosPorPagina: number = 10;
  totalPaginas: number = 0;
  listadoPaginado: Entrega[] = [];
  paginas: number[] = [];

  // search text
  textoBusqueda: string = '';

  constructor(
    private entregaService: EntregaService,
    private router: Router,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.listarEntregas();
  }

  listarEntregas() {
    this.entregaService.listarEntregas().subscribe({
      next: (response) => {
        if (!response) {
          this.listadoEntregas = [];
          this.listadoFiltrado = [];
          this.calcularPaginacion();  // pagination
          return;
        }

        // Handle both array and single object
        this.registros = response.registros;
        this.listadoEntregas = Array.isArray(response.data)
          ? response.data
          : [response.data];
        this.listadoFiltrado = [...this.listadoEntregas];
        this.paginaActual = 1;        // add
        this.calcularPaginacion();    // add
      },
      error: (err) => console.error('Error al listar entregas:', err)
    });
  }

  // Update filtrar() method
  filtrar() {
    const texto = this.textoBusqueda.toLowerCase().trim();
    if (!texto) {
      this.listadoFiltrado = [...this.listadoEntregas];
      this.textoBusqueda = '';
      this.paginaActual = 1;        // add
      this.calcularPaginacion();    // add
      return;
    }

    this.listadoFiltrado = this.listadoEntregas.filter(filtro =>
      filtro.folio.toLowerCase().includes(texto) || // Listado por folio
      filtro.cliente.toLowerCase().includes(texto) // Listado por cliente
    );

    this.paginaActual = 1;        // add
    this.calcularPaginacion();    // add
  }

  // Update limpiarBusqueda() method
  limpiarBusqueda() {
    this.listadoFiltrado = [...this.listadoEntregas];
    this.textoBusqueda = '';
    this.paginaActual = 1;        // add
    this.calcularPaginacion();    // add
  }

  registrarEntrega() {
    this.router.navigate(['/entregas/registrar']);
  }

  editarEntrega(entrega: Entrega) {
    localStorage.setItem('entregaLocal', JSON.stringify(entrega));
    this.router.navigate(['/entregas/actualizar']);
  }

  eliminarEntrega(entrega: Entrega) {
    if (!confirm(`Eliminar la entrega de la orden ${entrega.ordenId}?`)) return;

    const request: EliminarEntregaRequest = {
      idEntrega: entrega.idEntrega
    };

    this.entregaService.eliminarEntrega(request).subscribe({
      next: () => this.listarEntregas(),
      error: (err) => console.error('Error al eliminar entrega:', err)
    });
  }

  // PAGINACION
  calcularPaginacion() {
    this.totalPaginas = Math.ceil(this.listadoFiltrado.length / this.registrosPorPagina);
    this.paginas = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
    this.aplicarPagina();
  }

  aplicarPagina() {
    const inicio = (this.paginaActual - 1) * this.registrosPorPagina;
    const fin = inicio + this.registrosPorPagina;
    this.listadoPaginado = this.listadoFiltrado.slice(inicio, fin);
    this.cdr.detectChanges();
  }

  irAPagina(pagina: number) {
    if (pagina < 1 || pagina > this.totalPaginas) return;
    this.paginaActual = pagina;
    this.aplicarPagina();
  }

  paginaAnterior() {
    this.irAPagina(this.paginaActual - 1);
  }

  paginaSiguiente() {
    this.irAPagina(this.paginaActual + 1);
  }
}
