import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './servidor/auth.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  nombre: string = '';
  rol: string = '';
  menuAbierto: boolean = false;
  esLogin: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.nombre = this.authService.getNombre() || '';
    this.rol = this.authService.getRol() || '';

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.esLogin = event.url === '/login' || event.url === '/';
      if (!this.esLogin) {
        this.nombre = this.authService.getNombre() || '';
        this.rol = this.authService.getRol() || '';
      }
    });
  }

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
  }


  @HostListener('document:click', ['$event'])
  cerrarMenuAlClickFuera(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-menu') && !target.closest('.nav-item')) {
      this.menuAbierto = false;
    }
  }

}