import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { OrderService } from '../../services/order';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  private orderService = inject(OrderService);
  ordini: any[] = [];

  ngOnInit(): void {
    this.caricaOrdini();
  }

  caricaOrdini(): void {
    this.orderService.getOrders().subscribe({
      next: (dati) => (this.ordini = dati),
      error: (err) => console.error('Errore nel caricamento ordini:', err)
    });
  }

  cambiaStato(ordineId: string, nuovoStato: string): void {
    this.orderService.updateOrderStatus(ordineId, nuovoStato).subscribe({
      next: () => this.caricaOrdini(),
      error: (err) => console.error('Errore aggiornamento stato:', err)
    });
  }
}