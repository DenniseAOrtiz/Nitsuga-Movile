import { Component } from '@angular/core';
import { ApiUserService } from '../../services/api-user.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss'],
})
export class AddUserModalComponent {
  user: any = {};
  isAdmin: boolean = false;
  password: string = '';

  constructor(
    private apiUserService: ApiUserService,
    private modalController: ModalController
  ) {}

  addUser() {
    this.apiUserService.addUser({...this.user, isAdmin: this.isAdmin, password: this.password}).subscribe(() => {
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
