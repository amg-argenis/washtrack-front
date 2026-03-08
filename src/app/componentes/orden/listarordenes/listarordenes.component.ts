import { Component } from '@angular/core';
import { OrdenService } from '../../../servidor/orden.service';
import { Orden } from '../../../models/orden';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarordenes',
  imports: [CommonModule],
  templateUrl: './listarordenes.component.html',
  styleUrl: './listarordenes.component.css',
})
export class ListarordenesComponent {
  ordenes: Orden[] = [];

  constructor(private ordenService: OrdenService) { }

  buscar() {

    this.ordenService.buscarOrdenes()
      .subscribe({
        next: (data) => {
          this.ordenes = data;
        },
        error: (error) => {
          console.error(error);
        }
      });

  }
}
