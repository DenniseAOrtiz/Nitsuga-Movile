import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  email: string = '';
  isLoading = false;

  constructor(private router: Router, @Inject(DbService) private dbService: DbService, private loadingCtrl: LoadingController) {}

  onResetPassword() {
    this.showLoading();
    if (this.email) {
      alert(`Revisa tu bandeja en ${this.email} para recuperar tu contraseña.`);
      this.router.navigate(['/login']);
    } else {
      alert('Correo electrónico inexistente.');
    }
    this.isLoading = false;
  }
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      duration: 500,
    });

    loading.present();
  }
}