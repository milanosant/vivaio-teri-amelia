import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private apiUrl = 'http://localhost:3000/api/plants'; 

  constructor(private http: HttpClient) { }

  getPlants(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // NUOVA FUNZIONE: Cerca una sola pianta usando il suo ID univoco
  getPlantById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}