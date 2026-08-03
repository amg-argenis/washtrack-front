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
  submitted = false;
  cliente!: Cliente;

  private readonly emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  private readonly telefonoRegex = /^[0-9+()\-\s]{7,20}$/;

  clienteRequest: ActualizarClienteRequest = {
    idCliente: '',
    tenantId: '',
    nombre: '',
    contacto: '',
    telefono: '',
    email: '',
    creditoHabilitado: null,
    limiteCredito: null,
    activo: false
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
      idCliente: idCliente
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
          this.clienteRequest.nombre = this.cliente.nombre || '';
          this.clienteRequest.contacto = this.cliente.contacto || '';
          this.clienteRequest.telefono = this.cliente.telefono || '';
          this.clienteRequest.email = this.cliente.email || '';
          this.clienteRequest.creditoHabilitado = this.cliente.creditoHabilitado;
          this.clienteRequest.limiteCredito = this.cliente.limiteCredito;
          this.clienteRequest.activo = this.cliente.activo;
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

  // ----------------- Validaciones Formulario

  nombreVacio(): boolean {
    return !this.clienteRequest.nombre.trim();
  }

  nombreLargo(): boolean {
    return this.clienteRequest.nombre.length > 100;
  }

  contactoVacio(): boolean {
    return !this.clienteRequest.contacto.trim();
  }

  contactoLargo(): boolean {
    return this.clienteRequest.contacto.length > 100;
  }

  telefonoVacio(): boolean {
    return !this.clienteRequest.telefono.trim();
  }

  telefonoInvalido(): boolean {
    const telefono = this.clienteRequest.telefono.trim();
    if (!telefono) return false; // se reporta como vacio
    return !this.telefonoRegex.test(telefono);
  }

  emailInvalido(): boolean {
    const email = this.clienteRequest.email.trim();
    if (!email) return false; // opcional
    return !this.emailRegex.test(email);
  }

  creditoHabilitadoVacio(): boolean {
    return this.clienteRequest.creditoHabilitado == null;
  }

  limiteCreditoInvalido(): boolean {
    const limite = this.clienteRequest.limiteCredito;
    if (limite == null || limite < 0) return true;
    // Si el credito esta habilitado el limite debe ser mayor a 0
    if (this.clienteRequest.creditoHabilitado && limite <= 0) return true;
    return false;
  }

  formularioValido(): boolean {
    if (this.nombreVacio() || this.nombreLargo()) return false;
    if (this.contactoVacio() || this.contactoLargo()) return false;
    if (this.telefonoVacio() || this.telefonoInvalido()) return false;
    if (this.emailInvalido()) return false; // email opcional
    if (this.creditoHabilitadoVacio()) return false;
    if (this.limiteCreditoInvalido()) return false;
    return true;
  }

  guardar() {
    this.submitted = true;
    this.errorMsg = '';

    if (!this.formularioValido()) {
      this.errorMsg = 'Por favor capture y corrija los datos antes de continuar.';
      return;
    }

    this.guardando = true;

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