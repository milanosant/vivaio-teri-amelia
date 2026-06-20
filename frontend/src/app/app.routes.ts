import { Routes } from '@angular/router';
import { About } from './pages/about/about';
import { Home } from './pages/home/home';
import { PlantDetailComponent } from './pages/plant-detail/plant-detail.component';
import { AdminComponent } from './pages/admin/admin.component';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'chi-siamo', component: About },
  { path: 'pianta/:id', component: PlantDetailComponent },
  { path: 'admin', component: AdminComponent, canActivate: [adminGuard] },
  {
    path: 'admin/ordini',
    loadComponent: () => import('./pages/admin-orders/admin-orders.component').then(m => m.AdminOrdersComponent),
    canActivate: [adminGuard]
  },
  {
    path: 'carrello',
    loadComponent: () => import('./pages/cart/cart').then(m => m.CartPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.LoginPage)
  },
  {
    path: 'registrati',
    loadComponent: () => import('./pages/register/register').then(m => m.RegisterPage)
  }
];