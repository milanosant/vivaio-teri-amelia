import { Routes } from '@angular/router';
import { About } from './pages/about/about';
import { Home } from './pages/home/home'; // Angular potrebbe averlo chiamato HomeComponent, verifica il nome esatto nel file home.ts!

export const routes: Routes = [
  // Rotta principale (Catalogo)
  { path: '', component: Home },
  
  // Rotta Chi Siamo
  { path: 'chi-siamo', component: About }
];