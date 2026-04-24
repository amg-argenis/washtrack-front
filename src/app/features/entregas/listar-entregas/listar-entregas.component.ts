import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EntregaService } from '../../../servidor/entrega.service';
import { Entrega } from '../../../models/entregas/entrega';
import { EliminarEntregaRequest } from '../../../models/entregas/eliminar-entrega-request';

@Component({
  selector: 'app-listar-entregas',
  imports: [CommonModule],
  templateUrl: './listar-entregas.component.html',
  styleUrl: './listar-entregas.component.css'
})
export class ListarEntregasComponent implements OnInit {

  listadoEntregas: Entrega[] = [];

  constructor(
    private entregaService: EntregaService,
    private router: Router,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.listarEntregas();
  }

  listarEntregas() {
    this.entregaService.listarEntregas().subscribe({
      next: (response) => {
        if (!response) {
          this.listadoEntregas = [];
          this.cdr.detectChanges();
          return;
        }
        this.listadoEntregas = response.data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al listar entregas:', err)
    });
  }

  registrarEntrega() {
    this.router.navigate(['/entregas/registrar']);
  }

  eliminarEntrega(entrega: Entrega) {
    if (!confirm(`Eliminar la entrega de la orden ${entrega.ordenId}?`)) return;

    const request: EliminarEntregaRequest = {
      idEntrega: entrega.idEntrega
    };

    this.entregaService.eliminarEntrega(request).subscribe({
      next: () => this.listarEntregas(),
      error: (err) => console.error('Error al eliminar entrega:', err)
    });
  }
}
