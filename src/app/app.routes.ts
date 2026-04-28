import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { ListarordenesComponent } from './componentes/orden/listarordenes/listarordenes.component';
import { CrearordenComponent } from './componentes/orden/crearorden/crearorden.component';
import { ActualizarordenComponent } from './componentes/orden/actualizarorden/actualizarorden.component';
import { ListarClientesComponent } from './features/clientes/listar-clientes/listar-clientes.component';
import { CrearClienteComponent } from './features/clientes/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './features/clientes/editar-cliente/editar-cliente.component';
import { AgregarDetalleComponent } from './features/ordenes/agregar-detalle/agregar-detalle.component';
import { authGuard } from './servidor/auth-guard';
import { ListarEntregasComponent } from './features/entregas/listar-entregas/listar-entregas.component';
import { RegistrarEntregaComponent } from './features/entregas/registrar-entrega/registrar-entrega.component';
import { InicioComponent } from './features/dashboard/inicio/inicio.component';


export const routes: Routes = [
    // Publica
    { path: 'login', component: LoginComponent },

    // Ordenes servicio
    { path: 'ordenes/listar', component: ListarordenesComponent, canActivate: [authGuard] },
    { path: 'ordenes/crear', component: CrearordenComponent, canActivate: [authGuard] },
    { path: 'ordenes/editar', component: ActualizarordenComponent, canActivate: [authGuard] },
    { path: 'ordenes/agregar-detalle', component: AgregarDetalleComponent, canActivate: [authGuard] },
    // Clientes
    { path: 'clientes/listar', component: ListarClientesComponent, canActivate: [authGuard] },
    { path: 'clientes/crear', component: CrearClienteComponent, canActivate: [authGuard] },
    { path: 'clientes/editar', component: EditarClienteComponent, canActivate: [authGuard] },
    // Entregas
    { path: 'entregas/listar', component: ListarEntregasComponent, canActivate: [authGuard] },
    { path: 'entregas/registrar', component: RegistrarEntregaComponent, canActivate: [authGuard] },

    // Default
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    // Dashboard
    { path: 'inicio', component: InicioComponent, canActivate: [authGuard] }

];