import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CartService } from './services/cart';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, IonicModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  title = 'vivaio-teri-amelia';

  constructor(
    public cartService: CartService,
    public authService: AuthService
  ) {}

  logout(): void {
    this.authService.logout();
  }
}