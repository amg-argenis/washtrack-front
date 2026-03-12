import { Routes } from '@angular/router';
import { ListarordenesComponent } from './componentes/orden/listarordenes/listarordenes.component';
import { CrearordenComponent } from './componentes/orden/crearorden/crearorden.component';
import { ActualizarordenComponent } from './componentes/orden/actualizarorden/actualizarorden.component';

export const routes: Routes = [
    { path: 'ordenes/listar', component: ListarordenesComponent },
    { path: 'ordenes/crear', component: CrearordenComponent },
    { path: 'ordenes/editar/:id', component: ActualizarordenComponent },
    { path: '', redirectTo: 'ordenes/listar', pathMatch: 'full' }
];
