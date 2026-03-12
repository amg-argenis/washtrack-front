import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrdenService } from '../../../servidor/orden.service';
import { ActualizarOrdenRequest } from '../../../models/ordenservicio/actualizar-orden-request';

@Component({
  selector: 'app-editarorden',
  imports: [FormsModule],
  templateUrl: './actualizarorden.component.html',
  styleUrl: './actualizarorden.component.css',
})
export class ActualizarordenComponent implements OnInit {

  orden: ActualizarOrdenRequest = {
    idOrden: '',
    clienteId: '',
    folio: '',
    fechaIngreso: '',
    estado: '',
    totalPrendas: 1,
    observaciones: '',
    fechaEntrega: ''
  };

  estados = ['RECIBIDO', 'EN_PROCESO', 'LISTO', 'ENTREGADO'];
  guardando = false;
  errorMsg = '';

  constructor(
    private ordenService: OrdenService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { orden: any };

    if (state?.orden) {
      this.orden = { ...state.orden };
    } else {
      // Si recarga la página, volver al listado
      this.router.navigate(['/ordenes/listar']);
    }
  }

  guardar() {
    this.guardando = true;
    this.errorMsg = '';

    this.ordenService.actualizarOrden(this.orden).subscribe({
      next: () => {
        this.guardando = false;
        this.router.navigate(['/ordenes/listar']);
      },
      error: (err) => {
        this.guardando = false;
        this.errorMsg = 'Error al actualizar la orden. Verifica los datos.';
        console.error(err);
      }
    });
  }

  cancelar() {
    this.router.navigate(['/ordenes/listar']);
  }
}
