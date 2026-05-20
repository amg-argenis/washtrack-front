import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProcesoService } from '../../../servidor/proceso.service';
import { Proceso } from '../../../models/procesos/proceso';

@Component({
  selector: 'app-listar-procesos',
  imports: [CommonModule, FormsModule],  // add FormsModule
  templateUrl: './listar-procesos.component.html',
  styleUrl: './listar-procesos.component.css'
})
export class ListarProcesosComponent implements OnInit {

  listadoProcesos: Proceso[] = [];
  // filtered list for display
  listadoFiltrado: Proceso[] = [];
  // pagination properties
  paginaActual: number = 1;
  registrosPorPagina: number = 10;
  totalPaginas: number = 0;
  listadoPaginado: Proceso[] = [];
  paginas: number[] = [];
  // search text
  textoBusqueda: string = '';

  constructor(
    private procesoService: ProcesoService,
    private router: Router,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.listarProcesos();
  }

  listarProcesos() {
    this.procesoService.listarProcesos().subscribe({
      next: (response) => {
        if (!response) {
          this.listadoProcesos = [];
          this.listadoFiltrado = [];
          this.cdr.detectChanges();
          return;
        }
        this.listadoProcesos = Array.isArray(response.data)
          ? response.data
          : [response.data];
        // copy original list
        this.listadoFiltrado = [...this.listadoProcesos];
        this.paginaActual = 1;        // add
        this.calcularPaginacion();    // add
      },
      error: (err) => console.error('Error al listar procesos:', err)
    });
  }

  crearProceso() {
    this.router.navigate(['/procesos/crear']);
  }

  editarProceso(proceso: Proceso) {
    localStorage.setItem('procesoLocal', JSON.stringify(proceso));
    this.router.navigate(['/procesos/editar']);
  }

  eliminarProceso(proceso: Proceso) {
    if (!confirm(`Eliminar el proceso "${proceso.nombre}"?`)) return;

    this.procesoService.eliminarProceso(proceso.idproceso).subscribe({
      next: () => this.listarProcesos(),
      error: (err) => console.error('Error al eliminar proceso:', err)
    });
  }

  // filter in real time
  filtrar() {
    const texto = this.textoBusqueda.toLowerCase().trim();
    if (!texto) {
      this.listadoFiltrado = [...this.listadoProcesos];
      this.textoBusqueda = '';
      this.paginaActual = 1;        // add
      this.calcularPaginacion();    // add
      return;
    }
    this.listadoFiltrado = this.listadoProcesos.filter(proceso =>
      proceso.nombre.toLowerCase().includes(texto) ||
      proceso.descripcion?.toLowerCase().includes(texto) ||
      proceso.codigo?.toLowerCase().includes(texto)
    );
    this.paginaActual = 1;        // add
    this.calcularPaginacion();    // add
  }

  limpiarBusqueda() {
    this.listadoFiltrado = [...this.listadoProcesos];
    this.textoBusqueda = '';
    this.paginaActual = 1;        // add
    this.calcularPaginacion();    // add
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