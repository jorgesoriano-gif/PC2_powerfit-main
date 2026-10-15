import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { DashboardComponent } from './dashboard/dashboard';
import { NotFoundComponent } from './not-found/not-found';
import { Home } from './home/home';
import { Productos } from './productos/productos';
import { Ofertas } from './ofertas/ofertas';
import { Carrito } from './carrito/carrito';
import { MiCuenta } from './mi-cuenta/mi-cuenta';
import { Tienda } from './tienda/tienda';
import { Contacto } from './contacto/contacto';

import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'productos', component: Productos },
  { path: 'ofertas', component: Ofertas },

  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'carrito', component: Carrito},

  { path: 'contacto', component: Contacto },
  { path: 'tienda', component: Tienda },
  { path: 'mi-cuenta', component: MiCuenta },

  { path: '**', component: NotFoundComponent },
];
