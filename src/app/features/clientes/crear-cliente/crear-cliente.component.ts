import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../../servidor/cliente.service';
import { InsertarClienteRequest } from '../../../models/clientes/insertar-cliente-request';

@Component({
  selector: 'app-crear-cliente',
  imports: [FormsModule],
  templateUrl: './crear-cliente.component.html',
  styleUrl: './crear-cliente.component.css'
})
export class CrearClienteComponent {

  guardando = false;
  errorMsg = '';

  clienteRequest: InsertarClienteRequest = {
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

  guardar() {
    this.guardando = true;
    this.errorMsg = '';

    const newrequest = {
      ...this.clienteRequest,
      creditoHabilitado: String(this.clienteRequest.creditoHabilitado) === 'true' // convert to boolean
    };

    this.clienteService.insertarCliente(newrequest).subscribe({
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
        this.errorMsg = 'Error al crear el cliente. Verifica los datos.';
        console.error('Error al crear cliente:', err);
      }
    });
  }

  cancelar() {
    this.router.navigate(['/clientes/listar']);
  }
}