import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginPage {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastController = inject(ToastController);

  email = '';
  password = '';

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/']),
      error: async (err) => {
        const toast = await this.toastController.create({
          message: err.error?.message || 'Credenziali non valide.',
          duration: 3000,
          color: 'danger',
          position: 'top'
        });
        await toast.present();
      }
    });
  }
}