import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PlantService } from '../../services/plant';
import { CartService } from '../../services/cart';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-plant-detail',
  standalone: true,
  imports: [IonicModule, RouterModule],
  templateUrl: './plant-detail.component.html',
  styleUrls: ['./plant-detail.component.scss']
})
export class PlantDetailComponent implements OnInit {
  plant: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private plantService: PlantService,
    private cdr: ChangeDetectorRef,
    public cartService: CartService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.plantService.getPlantById(id).subscribe({
        next: (dati) => {
          this.plant = dati;
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Errore nel caricamento della pianta:', err)
      });
    }
  }

  onAddToCart(): void {
    this.cartService.aggiungiAlCarrello(this.plant);
  }

  onDelete(): void {
    if (confirm(`Sei sicuro di voler eliminare ${this.plant.name}? L'azione è irreversibile.`)) {
      this.plantService.deletePlant(this.plant._id).subscribe({
        next: () => {
          console.log('🔴 Pianta eliminata con successo!');
          this.router.navigate(['/']);
        },
        error: (err) => console.error('Errore durante l\'eliminazione:', err)
      });
    }
  }
}