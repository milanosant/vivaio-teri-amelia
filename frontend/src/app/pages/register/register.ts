import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class RegisterPage {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastController = inject(ToastController);

  name = '';
  email = '';
  phone = '';
  password = '';

  onSubmit(): void {
    this.authService.register({
      name: this.name,
      email: this.email,
      phone: this.phone,
      password: this.password
    }).subscribe({
      next: async () => {
        const toast = await this.toastController.create({
          message: '✅ Registrazione completata! Ora puoi accedere.',
          duration: 3000,
          color: 'success',
          position: 'top'
        });
        await toast.present();
        this.router.navigate(['/login']);
      },
      error: async (err) => {
        const toast = await this.toastController.create({
          message: err.error?.message || 'Errore durante la registrazione.',
          duration: 3000,
          color: 'danger',
          position: 'top'
        });
        await toast.present();
      }
    });
  }
}