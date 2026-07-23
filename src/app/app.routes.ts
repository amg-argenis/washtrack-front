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
import { adminGuard, operadorGuard } from './servidor/role-guard';
import { ListarEntregasComponent } from './features/entregas/listar-entregas/listar-entregas.component';
import { RegistrarEntregaComponent } from './features/entregas/registrar-entrega/registrar-entrega.component';
import { InicioComponent } from './features/dashboard/inicio/inicio.component';
import { ListarProcesosComponent } from './features/procesos/listar-procesos/listar-procesos.component';
import { CrearProcesoComponent } from './features/procesos/crear-proceso/crear-proceso.component';
import { EditarProcesoComponent } from './features/procesos/editar-proceso/editar-proceso.component';
import { RegistroTenantComponent } from './features/auth/registro-tenant/registro-tenant.component';
import { RegistroAdminComponent } from './features/auth/registro-admin/registro-admin.component';
import { RegistroListoComponent } from './features/auth/registro-listo/registro-listo.component';
import { ListarUsuariosComponent } from './features/usuarios/listar-usuarios/listar-usuarios.component';
import { CrearUsuarioComponent } from './features/usuarios/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './features/usuarios/editar-usuario/editar-usuario.component';

export const routes: Routes = [
    // Publica
    { path: 'login', component: LoginComponent },

    // Dashboard - all roles
    { path: 'inicio', component: InicioComponent, canActivate: [authGuard] },

    // Ordenes - ADMIN + OPERADOR
    { path: 'ordenes/listar', component: ListarordenesComponent, canActivate: [authGuard, operadorGuard] },
    { path: 'ordenes/crear', component: CrearordenComponent, canActivate: [authGuard, operadorGuard] },
    { path: 'ordenes/editar', component: ActualizarordenComponent, canActivate: [authGuard, operadorGuard] },
    { path: 'ordenes/agregar-detalle', component: AgregarDetalleComponent, canActivate: [authGuard, operadorGuard] },

    // Entregas - ADMIN + OPERADOR
    { path: 'entregas/listar', component: ListarEntregasComponent, canActivate: [authGuard, operadorGuard] },
    { path: 'entregas/registrar', component: RegistrarEntregaComponent, canActivate: [authGuard, operadorGuard] },

    // Clientes - ADMIN only
    { path: 'clientes/listar', component: ListarClientesComponent, canActivate: [authGuard, adminGuard] },
    { path: 'clientes/crear', component: CrearClienteComponent, canActivate: [authGuard, adminGuard] },
    { path: 'clientes/editar', component: EditarClienteComponent, canActivate: [authGuard, adminGuard] },

    // Procesos - ADMIN only
    { path: 'procesos/listar', component: ListarProcesosComponent, canActivate: [authGuard, adminGuard] },
    { path: 'procesos/crear', component: CrearProcesoComponent, canActivate: [authGuard, adminGuard] },
    { path: 'procesos/editar', component: EditarProcesoComponent, canActivate: [authGuard, adminGuard] },

    // Usuarios - ADMIN only
    { path: 'usuarios/listar', component: ListarUsuariosComponent, canActivate: [authGuard, adminGuard] },
    { path: 'usuarios/crear', component: CrearUsuarioComponent, canActivate: [authGuard, adminGuard] },
    { path: 'usuarios/editar', component: EditarUsuarioComponent, canActivate: [authGuard, adminGuard] },

    // Registro publico
    { path: 'registro', component: RegistroTenantComponent },
    { path: 'registro/admin', component: RegistroAdminComponent },
    { path: 'registro/listo', component: RegistroListoComponent },

    // Default
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];