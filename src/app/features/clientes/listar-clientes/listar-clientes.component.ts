import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../../servidor/cliente.service';
import { Cliente } from '../../../models/clientes/cliente';
import { ClienteResponse } from '../../../models/clientes/cliente-response';
import { EliminarClienteRequest } from '../../../models/clientes/eliminar-cliente-request';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-clientes',
  imports: [CommonModule, FormsModule],
  templateUrl: './listar-clientes.component.html',
  styleUrl: './listar-clientes.component.css'
})
export class ListarClientesComponent implements OnInit {

  listadoClientes: Cliente[] = [];
  // filtered list for display
  listadoFiltrado: Cliente[] = [];
  // pagination properties
  paginaActual: number = 1;
  registrosPorPagina: number = 6;
  totalPaginas: number = 0;
  listadoPaginado: Cliente[] = [];
  paginas: number[] = [];
  // search text
  textoBusqueda: string = '';

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.listarClientes();
  }

  listarClientes() {
    this.clienteService.listarClientes().subscribe({
      next: (response: ClienteResponse | null) => {
        if (!response) {
          this.listadoClientes = [];
          this.listadoFiltrado = [];
          this.calcularPaginacion();
          this.cdr.detectChanges();
          return;
        }
        this.listadoClientes = response.data;
        this.listadoFiltrado = [...this.listadoClientes];
        this.paginaActual = 1;
        this.calcularPaginacion();
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al listar clientes:', err)
    });
  }

  nuevoCliente() {
    this.router.navigate(['/clientes/crear']);
  }

  editarCliente(cliente: Cliente) {
    localStorage.setItem('idClienteLocal', cliente.idCliente);
    this.router.navigate(['/clientes/editar']);
  }

  eliminarCliente(cliente: Cliente) {
    if (!confirm(`Eliminar el cliente ${cliente.nombre}?`)) return;

    const request: EliminarClienteRequest = {
      idCliente: cliente.idCliente,
      tenantId: cliente.tenantId
    };

    this.clienteService.eliminarCliente(request).subscribe({
      next: () => this.listarClientes(),
      error: (err) => console.error('Error al eliminar cliente:', err)
    });
  }

  // filter in real time
  filtrar() {
    const texto = this.textoBusqueda.toLowerCase().trim();
    if (!texto) {
      this.listadoFiltrado = [...this.listadoClientes];
      this.textoBusqueda = '';
      this.paginaActual = 1;        // add
      this.calcularPaginacion();    // add
      return;
    }
    this.listadoFiltrado = this.listadoClientes.filter(cliente =>
      cliente.nombre.toLowerCase().includes(texto) ||
      cliente.contacto?.toLowerCase().includes(texto) ||
      cliente.email?.toLowerCase().includes(texto)
    );
    this.paginaActual = 1;        // add
    this.calcularPaginacion();    // add
  }

  limpiarBusqueda() {
    this.listadoFiltrado = [...this.listadoClientes];
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