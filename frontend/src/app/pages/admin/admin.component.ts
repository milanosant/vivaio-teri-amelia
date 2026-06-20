import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Serve per catturare i dati dai campi di testo [(ngModel)]
import { IonicModule } from '@ionic/angular';
import { PlantService } from '../../services/plant';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [IonicModule, RouterModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  // Struttura della nuova pianta che si popolerà man mano che l'admin scrive nel Form
  newPlant = {
    name: '',
    scientificName: '',
    description: '',
    price: null,
    status: 'pronte', // Valore di default
    imageUrl: '',
    botanicalInfo: {
      temperature: '',
      sunlight: '',
      watering: '',
      companionsInput: '' // Campo temporaneo per le piante amiche scritte separate da virgola
    }
  };

  constructor(
    private plantService: PlantService,
    private router: Router
  ) {}

  // Funzione che scatta quando l'admin clicca su "Salva Piantina"
  onSave(): void {
    // Trasformiamo la stringa delle piante amiche in un vero array di stringhe prima di inviarlo
    const companionsArray = this.newPlant.botanicalInfo.companionsInput
      ? this.newPlant.botanicalInfo.companionsInput.split(',').map(item => item.trim())
      : [];

    // Prepariamo il pacchetto dati finale così come lo vuole MongoDB
    const payload = {
      name: this.newPlant.name,
      scientificName: this.newPlant.scientificName,
      description: this.newPlant.description,
      price: this.newPlant.price,
      status: this.newPlant.status,
      imageUrl: this.newPlant.imageUrl,
      botanicalInfo: {
        temperature: this.newPlant.botanicalInfo.temperature,
        sunlight: this.newPlant.botanicalInfo.sunlight,
        watering: this.newPlant.botanicalInfo.watering,
        companions: companionsArray
      }
    };

    // Chiamiamo il postino per salvare la pianta sul database
    this.plantService.createPlant(payload).subscribe({
      next: (risposta) => {
        console.log('🟢 Nuova pianta salvata con successo!', risposta);
        // Una volta salvata, reindirizziamo l'admin automaticamente alla Home/Catalogo per vederla!
        this.router.navigate(['/']);
      },
      error: (err) => console.error('🔴 Errore durante il salvataggio:', err)
    });
  }
}