import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../../servidor/cliente.service';
import { ActualizarClienteRequest } from '../../../models/clientes/actualizar-cliente-request';
import { BuscarClienteRequest } from '../../../models/clientes/buscar-cliente-request';
import { ClienteResponse } from '../../../models/clientes/cliente-response';
import { Cliente } from '../../../models/clientes/cliente';
import { ClienteResponseOne } from '../../../models/clientes/cliente-response-one';

@Component({
  selector: 'app-editar-cliente',
  imports: [FormsModule],
  templateUrl: './editar-cliente.component.html',
  styleUrl: './editar-cliente.component.css'
})
export class EditarClienteComponent implements OnInit {

  guardando = false;
  errorMsg = '';
  cliente!: Cliente;

  clienteRequest: ActualizarClienteRequest = {
    idCliente: '',
    tenantId: '',
    nombre: '',
    contacto: '',
    telefono: '',
    email: '',
    creditoHabilitado: false,
    limiteCredito: 0
  };

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.buscarCliente();
  }

  buscarCliente() {
    const idCliente = localStorage.getItem('idClienteLocal');

    if (!idCliente) {
      this.router.navigate(['/clientes/listar']);
      return;
    }

    const request: BuscarClienteRequest = {
      idCliente: idCliente,
      tenantId: 'a051a168-fa2a-11f0-aab7-e66133dbb0de' // hardcodeado por ahora
    };

    this.clienteService.buscarCliente(request).subscribe({
      next: (data: ClienteResponseOne | null) => {
        if (!data) {
          alert('No hay informacion para este cliente !');
          this.cdr.detectChanges();
          return;
        }

        if (data.success) {
          console.log('Informacion del cliente obtenida');

          this.cliente = data.data;

          this.clienteRequest.idCliente = this.cliente.idCliente;
          this.clienteRequest.tenantId = this.cliente.tenantId;
          this.clienteRequest.nombre = this.cliente.nombre;
          this.clienteRequest.contacto = this.cliente.contacto;
          this.clienteRequest.telefono = this.cliente.telefono;
          this.clienteRequest.email = this.cliente.email;
          this.clienteRequest.creditoHabilitado = this.cliente.creditoHabilitado;
          this.clienteRequest.limiteCredito = this.cliente.limiteCredito;
          this.cdr.detectChanges();
        } else {
          alert('No hay informacion para este cliente.');
        }
      },
      error: (err) => {
        this.cdr.detectChanges();
        console.error('Error al obtener cliente:', err);
      }
    });
  }

  guardar() {
    this.guardando = true;
    this.errorMsg = '';

    this.clienteService.actualizarCliente(this.clienteRequest).subscribe({
      next: (data) => {
        this.guardando = false;
        if (!data) {
          this.errorMsg = 'No se recibio respuesta del servidor.';
          return;
        }
        this.router.navigate(['/clientes/listar']);
      },
      error: (err) => {
        this.guardando = false;
        this.errorMsg = 'Error al actualizar el cliente. Verifica los datos.';
        console.error('Error al actualizar cliente:', err);
      }
    });
  }

  cancelar() {
    this.router.navigate(['/clientes/listar']);
  }
}