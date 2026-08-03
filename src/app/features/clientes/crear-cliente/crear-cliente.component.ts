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
  submitted = false;

  private readonly emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  private readonly telefonoRegex = /^[0-9+()\-\s]{7,20}$/;

  clienteRequest: InsertarClienteRequest = {
    nombre: '',
    contacto: '',
    telefono: '',
    email: '',
    creditoHabilitado: null,
    limiteCredito: null
  };

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private cdr: ChangeDetectorRef) { }

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

    this.clienteService.insertarCliente(this.clienteRequest).subscribe({
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