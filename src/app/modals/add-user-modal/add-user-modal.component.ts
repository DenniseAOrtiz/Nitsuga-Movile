import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss'],
})
export class AddUserModalComponent {
  user: any = {};
  username: string = '';
  isAdmin: number = 0;
  password: string = '';

  constructor(
    private dbService: DbService,
    private modalController: ModalController
  ) {}

  addUser() {
    this.dbService.register(this.username, this.password, this.isAdmin).then(() => {
      alert('Usuario agregado correctamente');
      this.modalController.dismiss();
    }, error => {
      alert('Error al agregar el usuario: ' + JSON.stringify(error));
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
