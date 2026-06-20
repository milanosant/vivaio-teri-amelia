import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular'; // Importiamo il "vocabolario" di Ionic

@Component({
  selector: 'app-root',
  standalone: true,
  // Aggiungiamo IonicModule nella lista degli imports
  imports: [RouterModule, IonicModule], 
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  title = 'vivaio-teri-amelia';
}