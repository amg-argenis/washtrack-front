import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-listo',
  imports: [CommonModule],
  templateUrl: './registro-listo.component.html',
  styleUrl: './registro-listo.component.css'
})
export class RegistroListoComponent {

  constructor(private router: Router) { }

  irALogin() {
    this.router.navigate(['/login']);
  }
}