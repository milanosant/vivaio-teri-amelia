import { Routes } from '@angular/router';
import { About } from './pages/about/about';
import { Home } from './pages/home/home';
// Guarda qui: abbiamo aggiunto ".component" alla fine del percorso e "Component" al nome della classe!
import { PlantDetailComponent } from './pages/plant-detail/plant-detail.component';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'chi-siamo', component: About },
  
  // Usiamo il nome corretto della classe qui
  { path: 'pianta/:id', component: PlantDetailComponent } 
];