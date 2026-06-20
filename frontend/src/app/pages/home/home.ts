import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Importiamo il ChangeDetectorRef
import { RouterModule } from '@angular/router'; 
import { IonicModule } from '@ionic/angular'; 
import { PlantService } from '../../services/plant';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit {
  plants: any[] = [];

  // 2. "Iniettiamo" lo strumento nel costruttore insieme al postino
  constructor(
    private plantService: PlantService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.plantService.getPlants().subscribe({
      next: (datiDalServer) => {
        this.plants = datiDalServer;
        
        // 3. Diamo la "sveglia" manuale all'interfaccia grafica!
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Errore durante la chiamata al server:', err);
      }
    });
  }
}