import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../../servidor/cliente.service';
import { Cliente } from '../../../models/clientes/cliente';
import { ClienteResponse } from '../../../models/clientes/cliente-response';
import { EliminarClienteRequest } from '../../../models/clientes/eliminar-cliente-request';

@Component({
  selector: 'app-listar-clientes',
  imports: [CommonModule],
  templateUrl: './listar-clientes.component.html',
  styleUrl: './listar-clientes.component.css'
})
export class ListarClientesComponent implements OnInit {

  listadoClientes: Cliente[] = [];

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
          this.cdr.detectChanges();
          return;
        }
        this.listadoClientes = response.data;
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
}