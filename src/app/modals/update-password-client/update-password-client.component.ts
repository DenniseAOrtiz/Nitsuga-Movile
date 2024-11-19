import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-update-password-client',
  templateUrl: './update-password-client.component.html',
  styleUrls: ['./update-password-client.component.scss'],
})
export class UpdatePasswordClientComponent {
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private modalController: ModalController, private dbService: DbService) {}

  dismiss() {
    this.modalController.dismiss();
  }

  async savePassword() {
    if (!this.currentPassword.trim() || !this.newPassword.trim() || !this.confirmPassword.trim()) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      alert('La nueva contraseña y su confirmación no coinciden.');
      return;
    }

    const isValid = await this.dbService.validateCurrentPassword(this.currentPassword);
    if (!isValid) {
      alert('La contraseña actual es incorrecta.');
      return;
    }

    await this.dbService.updatePassword(this.newPassword);
    alert('Contraseña actualizada correctamente.');
    this.dismiss();
  }
}
