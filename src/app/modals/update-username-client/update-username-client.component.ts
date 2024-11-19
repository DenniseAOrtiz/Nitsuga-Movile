import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-update-username-client',
  templateUrl: './update-username-client.component.html',
  styleUrls: ['./update-username-client.component.scss'],
})
export class UpdateUsernameClientComponent implements OnInit {
  @Input() currentUsername!: string;
  newUsername: string = '';

  constructor(private modalController: ModalController, private dbService: DbService) {}

  ngOnInit() {
    this.newUsername = this.currentUsername;
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async saveUsername() {
    if (this.newUsername.trim()) {
      await this.dbService.updateUsername(this.newUsername);
      alert('Nombre de usuario actualizado correctamente');
      this.modalController.dismiss({ updatedUsername: this.newUsername });
    } else {
      alert('Por favor, ingrese un nombre de usuario válido.');
    }
  }
}
