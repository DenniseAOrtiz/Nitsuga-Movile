import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.scss'],
})
export class UpdateClientComponent {
  @Input() username!: string;
  password: string = '';

  constructor(private modalController: ModalController, private dbService: DbService) {}

  dismiss() {
    this.modalController.dismiss();
  }

  async saveChanges() {
    if (this.username && this.password) {
      await this.dbService.updateUserProfile(this.username, this.password);
      alert('Perfil actualizado correctamente');
      this.dismiss();
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }
}

