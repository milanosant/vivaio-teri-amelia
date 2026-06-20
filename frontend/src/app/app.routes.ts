import { Routes } from '@angular/router';
import { About } from './pages/about/about';
import { Home } from './pages/home/home';
import { PlantDetailComponent } from './pages/plant-detail/plant-detail.component';
import { AdminComponent } from './pages/admin/admin.component'; // 1. Importa il nuovo componente

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'chi-siamo', component: About },
  { path: 'pianta/:id', component: PlantDetailComponent },
  { path: 'admin', component: AdminComponent } // 2. Aggiungi la rotta
];