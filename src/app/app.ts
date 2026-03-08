import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('washtrack-front');

  constructor(private router: Router) { }

  listarOrdenes() {
    this.router.navigate(['ordenes/listar'])

  }

}
