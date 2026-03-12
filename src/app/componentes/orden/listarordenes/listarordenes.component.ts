import { Component, OnInit } from '@angular/core';
import { OrdenService } from '../../../servidor/orden.service';
import { Orden } from '../../../models/ordenservicio/orden';
import { FormsModule } from '@angular/forms';
import { OrdenResponse } from '../../../models/ordenservicio/ordenrespuesta';

@Component({
  selector: 'app-listarordenes',
  imports: [FormsModule],
  templateUrl: './listarordenes.component.html',
  styleUrl: './listarordenes.component.css',
})
export class ListarordenesComponent implements OnInit {
  listadoOrdenServicio: Orden[] = [];

  constructor(private ordenService: OrdenService) { }

  ngOnInit(): void {
    this.listarOrdenesServicioComponent(); // 👈 carga al entrar a la vista
  }

  listarOrdenesServicioComponent() {
    this.ordenService.listarOrdenesServicio()
      .subscribe({
        next: (response: OrdenResponse) => {
          this.listadoOrdenServicio = [...response.data];
        },
        error: (err) => console.error('Error:', err)
      });
  }
}