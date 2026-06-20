import { Component, OnInit } from '@angular/core';
import { PlantService } from '../../services/plant';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [], // Non serve più CommonModule con la nuova sintassi magica!
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit {
  // Qui salveremo le piantine che arrivano dal database
  plants: any[] = [];

  // "Iniettiamo" il nostro postino nel costruttore
  constructor(private plantService: PlantService) {}

  // Questa funzione scatta in automatico appena si apre la pagina
  ngOnInit(): void {
    this.plantService.getPlants().subscribe({
      next: (datiDalServer) => {
        this.plants = datiDalServer;
        console.log('Piantine caricate:', this.plants);
      },
      error: (err) => console.error('Errore nel caricamento del catalogo', err)
    });
  }
}