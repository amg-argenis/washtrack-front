import { Routes } from '@angular/router';
import { ListarordenesComponent } from './componentes/orden/listarordenes/listarordenes.component';
import { CrearordenComponent } from './componentes/orden/crearorden/crearorden.component';
import { ActualizarordenComponent } from './componentes/orden/actualizarorden/actualizarorden.component';
import { ListarClientesComponent } from './features/clientes/listar-clientes/listar-clientes.component';
import { CrearClienteComponent } from './features/clientes/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './features/clientes/editar-cliente/editar-cliente.component';

export const routes: Routes = [
    // Ordenes
    { path: 'ordenes/listar', component: ListarordenesComponent },
    { path: 'ordenes/crear', component: CrearordenComponent },
    { path: 'ordenes/editar', component: ActualizarordenComponent },
    // Clientes
    { path: 'clientes/listar', component: ListarClientesComponent },
    { path: 'clientes/crear', component: CrearClienteComponent },
    { path: 'clientes/editar', component: EditarClienteComponent },
    // Default
    { path: '', redirectTo: 'ordenes/listar', pathMatch: 'full' }
];
