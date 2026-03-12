import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrdenService } from '../../../servidor/orden.service';
import { InsertarOrdenRequest } from '../../../models/ordenservicio/insertar-orden-request';

@Component({
  selector: 'app-crearorden',
  imports: [FormsModule],
  templateUrl: './crearorden.component.html',
  styleUrl: './crearorden.component.css',
})
export class CrearordenComponent {

  orden: InsertarOrdenRequest = {
    clienteId: '',
    fechaIngreso: '',
    estado: 'RECIBIDO',
    totalPrendas: 1,
    observaciones: '',
    tenantId: '',
    fechaEntrega: ''
  };

  estados = ['RECIBIDO', 'EN_PROCESO', 'LISTO', 'ENTREGADO'];
  guardando = false;
  errorMsg = '';

  constructor(private ordenService: OrdenService, private router: Router) { }

  guardar() {
    this.guardando = true;
    this.errorMsg = '';

    this.ordenService.crearOrden(this.orden).subscribe({
      next: () => {
        this.guardando = false;
        this.router.navigate(['/ordenes/listar']);
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
}