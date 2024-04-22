import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { MovimientosComponent } from './components/movimientos/movimientos.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'empleados', component: EmpleadosComponent },
    { path: 'movimientos', component: MovimientosComponent }
];
