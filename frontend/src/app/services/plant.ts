import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private apiUrl = 'http://localhost:3000/api/plants'; 

  constructor(private http: HttpClient) { }

  // Ottieni tutte le piante
  getPlants(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Ottieni una singola pianta
  getPlantById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // NUOVA FUNZIONE: Spedisce i dati della nuova pianta al backend con il metodo POST
  createPlant(plantData: any): Observable<any> {
    return this.http.post(this.apiUrl, plantData);
  }
}