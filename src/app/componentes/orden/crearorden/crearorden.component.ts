import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrdenService } from '../../../servidor/orden.service';
import { ClienteService } from '../../../servidor/cliente.service';
import { InsertarOrdenRequest } from '../../../models/ordenservicio/insertar-orden-request';
import { Cliente } from '../../../models/clientes/cliente';
import { ClienteResponse } from '../../../models/clientes/cliente-response';
import { InsertarOrdenResponse } from '../../../models/ordenservicio/orden-response';

@Component({
  selector: 'app-crearorden',
  imports: [FormsModule, CommonModule],
  templateUrl: './crearorden.component.html',
  styleUrl: './crearorden.component.css',
})
export class CrearordenComponent implements OnInit {

  orden: InsertarOrdenRequest = {
    clienteId: '',
    fechaIngreso: '',
    estado: 'RECIBIDO',
    totalPrendas: 1,
    observaciones: '',
    fechaEntrega: ''
  };

  estados = ['RECIBIDO', 'EN_PROCESO', 'LISTO', 'ENTREGADO'];
  guardando = false;
  errorMsg = '';
  listadoClientes: Cliente[] = [];
  clienteSeleccionado: string = ''; // nombre del cliente seleccionado

  // Dropdown filter properties
  listadoClientesFiltrado: Cliente[] = [];
  textoBusquedaCliente: string = '';
  mostrarDropdown: boolean = false;

  constructor(
    private ordenService: OrdenService,
    private clienteService: ClienteService,
    private router: Router) { }

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes() {
    this.clienteService.listarClientes().subscribe({
      next: (response: ClienteResponse | null) => {
        if (!response) return;
        this.listadoClientes = Array.isArray(response.data)
          ? response.data
          : [response.data];
        this.listadoClientesFiltrado = [...this.listadoClientes];
      },
      error: (err) => console.error('Error al cargar clientes:', err)
    });
  }

  onClienteChange(idCliente: string) {
    const cliente = this.listadoClientes.find(c => c.idCliente === idCliente);
    this.clienteSeleccionado = cliente ? cliente.nombre : '';
    this.orden.clienteId = idCliente;
  }

  guardar() {
    this.guardando = true;
    this.errorMsg = '';

    this.ordenService.crearOrden(this.orden).subscribe({
      next: (data: InsertarOrdenResponse | null) => {
        this.guardando = false;
        if (!data) {
          this.errorMsg = 'No se recibio respuesta del servidor.';
          return;
        }
        localStorage.setItem('idOrdenLocal', data.data.idOrden);
        localStorage.setItem('folioLocal', data.data.folio);
        this.router.navigate(['/ordenes/agregar-detalle']);
      },
      error: (err) => {
        this.guardando = false;
        this.errorMsg = 'Error al guardar la orden. Verifica los datos.';
        console.error(err);
      }
    });
  }

  cancelar() {
    this.router.navigate(['/ordenes/listar']);
  }

  // Dropdown with text filter
  filtrarClientes() {
    const texto = this.textoBusquedaCliente.toLowerCase().trim();
    if (!texto) {
      this.listadoClientesFiltrado = [...this.listadoClientes];
      return;
    }
    this.listadoClientesFiltrado = this.listadoClientes.filter(c =>
      c.nombre.toLowerCase().includes(texto)
    );
  }

  seleccionarCliente(cliente: Cliente) {
    this.orden.clienteId = cliente.idCliente;
    this.clienteSeleccionado = cliente.nombre;
    this.textoBusquedaCliente = cliente.nombre;
    this.mostrarDropdown = false;
  }

  abrirDropdown() {
    this.mostrarDropdown = true;
    this.textoBusquedaCliente = '';
    this.listadoClientesFiltrado = [...this.listadoClientes];
  }

  cerrarDropdown() {
    setTimeout(() => {
      this.mostrarDropdown = false;
      // Restore selected client name if no new selection
      if (this.clienteSeleccionado) {
        this.textoBusquedaCliente = this.clienteSeleccionado;
      }
    }, 200);
  }
}