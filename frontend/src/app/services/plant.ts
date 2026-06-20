import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  // Questo è l'indirizzo esatto che abbiamo configurato nel backend!
  private apiUrl = 'http://localhost:3000/api/plants'; 

  constructor(private http: HttpClient) { }

  // Funzione che richiede tutte le piantine al database
  getPlants(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}