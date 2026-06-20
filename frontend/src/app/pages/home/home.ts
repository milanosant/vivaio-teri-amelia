import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PlantService } from '../../services/plant';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {
  plants: any[] = [];

  constructor(
    private plantService: PlantService,
    private cdr: ChangeDetectorRef,
    public cartService: CartService
  ) {}

  ionViewWillEnter(): void {
    this.plantService.getPlants().subscribe({
      next: (datiDalServer) => {
        this.plants = datiDalServer;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Errore durante la chiamata al server:', err);
      }
    });
  }

  aggiungiAlCarrello(plant: any): void {
    this.cartService.aggiungiAlCarrello(plant);
  }
}