import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router'; // ActivatedRoute serve a leggere l'URL
import { IonicModule } from '@ionic/angular';
import { PlantService } from '../../services/plant';

@Component({
  selector: 'app-plant-detail',
  standalone: true,
  imports: [IonicModule, RouterModule],
  templateUrl: './plant-detail.component.html',
  styleUrls: ['./plant-detail.component.scss']
})
export class PlantDetailComponent implements OnInit {
  plant: any = null; // All'inizio è vuota, in attesa dei dati

  constructor(
    private route: ActivatedRoute, // Il nostro lettore di URL
    private plantService: PlantService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // 1. Catturiamo l'ID dall'indirizzo in alto
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      // 2. Chiediamo al postino di portarci solo questa pianta
      this.plantService.getPlantById(id).subscribe({
        next: (dati) => {
          this.plant = dati;
          this.cdr.detectChanges(); // Svegliamo la grafica come prima!
        },
        error: (err) => console.error('Errore nel caricamento della pianta:', err)
      });
    }
  }
}