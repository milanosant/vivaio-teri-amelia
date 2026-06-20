import { Injectable, signal, computed, effect } from '@angular/core';

export interface Plant {
  _id: string;
  name: string;
  scientificName?: string;
  description?: string;
  price: number;
  status?: string;
  imageUrl?: string;
  botanicalInfo?: {
    temperature?: string;
    sunlight?: string;
    watering?: string;
    companions?: string[];
  };
}

export interface CartItem {
  plant: Plant;
  quantita: number;
}

const STORAGE_KEY = 'vivaio_carrello';

@Injectable({ providedIn: 'root' })
export class CartService {
  private itemsSignal = signal<CartItem[]>(this.loadFromStorage());

  readonly items = this.itemsSignal.asReadonly();

  readonly totaleArticoli = computed(() =>
    this.itemsSignal().reduce((acc, item) => acc + item.quantita, 0)
  );

  readonly totalePrezzo = computed(() =>
    this.itemsSignal().reduce((acc, item) => acc + item.plant.price * item.quantita, 0)
  );

  constructor() {
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.itemsSignal()));
    });
  }

  private loadFromStorage(): CartItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  aggiungiAlCarrello(plant: Plant, quantita: number = 1): void {
    const items = this.itemsSignal();
    const existing = items.find(i => i.plant._id === plant._id);

    if (existing) {
      this.itemsSignal.set(
        items.map(i =>
          i.plant._id === plant._id ? { ...i, quantita: i.quantita + quantita } : i
        )
      );
    } else {
      this.itemsSignal.set([...items, { plant, quantita }]);
    }
  }

  aggiornaQuantita(plantId: string, quantita: number): void {
    if (quantita <= 0) {
      this.rimuoviDalCarrello(plantId);
      return;
    }
    this.itemsSignal.set(
      this.itemsSignal().map(i => (i.plant._id === plantId ? { ...i, quantita } : i))
    );
  }

  rimuoviDalCarrello(plantId: string): void {
    this.itemsSignal.set(this.itemsSignal().filter(i => i.plant._id !== plantId));
  }

  svuotaCarrello(): void {
    this.itemsSignal.set([]);
  }
}