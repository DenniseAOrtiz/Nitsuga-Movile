import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss'],
})
export class EditUserModalComponent  implements OnInit {
  user: any = {};
  username: string = '';
  isAdmin: number = 0;
  password: string = '';

  constructor(
    private dbService: DbService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.username = this.user.username;
    this.password = this.user.password;
    this.isAdmin = this.user.isAdmin;
  }

  editUser() {
    this.dbService.updateUser(this.user.id, this.username, this.password, this.isAdmin).then(() => {
      alert('Usuario actualizado correctamente');
      this.modalController.dismiss();
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
