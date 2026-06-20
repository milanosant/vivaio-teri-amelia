import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { CartService } from '../../services/cart';
import { OrderService } from '../../services/order';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class CartPage {
  cartService = inject(CartService);
  private orderService = inject(OrderService);
  private authService = inject(AuthService);
  private alertController = inject(AlertController);
  private toastController = inject(ToastController);
  private router = inject(Router);

  items = this.cartService.items;
  totaleArticoli = this.cartService.totaleArticoli;
  totalePrezzo = this.cartService.totalePrezzo;

  incrementa(plantId: string, quantitaAttuale: number): void {
    this.cartService.aggiornaQuantita(plantId, quantitaAttuale + 1);
  }

  decrementa(plantId: string, quantitaAttuale: number): void {
    this.cartService.aggiornaQuantita(plantId, quantitaAttuale - 1);
  }

  rimuovi(plantId: string): void {
    this.cartService.rimuoviDalCarrello(plantId);
  }

  svuota(): void {
    this.cartService.svuotaCarrello();
  }

  async procediOrdine(): Promise<void> {
    if (!this.authService.isLoggedIn()) {
      const toast = await this.toastController.create({
        message: 'Devi accedere per completare l\'ordine.',
        duration: 2500,
        color: 'warning',
        position: 'top'
      });
      await toast.present();
      this.router.navigate(['/login']);
      return;
    }

    const righe = this.items()
      .map(i => `${i.plant.name} x${i.quantita} — € ${(i.plant.price * i.quantita).toFixed(2)}`)
      .join('<br>');

    const alert = await this.alertController.create({
      header: '📦 Completa il tuo Ordine',
      message: `${righe}<br><br><strong>Totale: € ${this.totalePrezzo().toFixed(2)}</strong>`,
      inputs: [
        { type: 'radio', label: 'Ritiro in sede', value: 'ritiro in sede', name: 'shippingMethod', checked: true },
        { type: 'radio', label: 'Spedizione', value: 'spedizione', name: 'shippingMethod' }
      ],
      buttons: [
        { text: 'Annulla', role: 'cancel' },
        {
          text: 'Conferma Ordine',
          handler: (data) => {
            if (!data.shippingMethod) {
              this.mostraErroreCampi();
              return false;
            }
            this.confermaOrdine(data.shippingMethod);
            return true;
          }
        }
      ]
    });

    await alert.present();
  }

  private async mostraErroreCampi(): Promise<void> {
    const toast = await this.toastController.create({
      message: '⚠️ Seleziona una modalità di consegna.',
      duration: 2500,
      color: 'warning',
      position: 'top'
    });
    await toast.present();
  }

  private confermaOrdine(shippingMethod: string): void {
    const orderData = {
      shippingMethod,
      items: this.items().map(i => ({
        plant: i.plant._id,
        quantity: i.quantita,
        priceAtPurchase: i.plant.price
      })),
      totalAmount: this.totalePrezzo()
    };

    this.orderService.createOrder(orderData).subscribe({
      next: async () => {
        this.cartService.svuotaCarrello();
        const toast = await this.toastController.create({
          message: '✅ Ordine confermato! Ti contatteremo a breve.',
          duration: 3000,
          color: 'success',
          position: 'top'
        });
        await toast.present();
        this.router.navigate(['/']);
      },
      error: async (err) => {
        console.error('Errore durante invio ordine:', err);
        const toast = await this.toastController.create({
          message: "❌ Errore durante l'invio dell'ordine. Riprova.",
          duration: 3000,
          color: 'danger',
          position: 'top'
        });
        await toast.present();
      }
    });
  }
}