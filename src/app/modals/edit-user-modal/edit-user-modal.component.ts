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
  isBlocked: number = 0;
  password: string = '';

  constructor(
    private dbService: DbService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.username = this.user.username;
    this.password = this.user.password;
    this.isAdmin = this.user.isAdmin;
    this.isBlocked = this.user.isBlocked;
  }

  editUser() {
    this.isAdmin = this.isAdmin === 1 ? 0 : 1; 
    this.isBlocked = this.isBlocked === 1 ? 0 : 1;
  
    this.dbService.updateUser(this.user.id, this.username, this.isAdmin, this.isBlocked).then(() => {
      alert('Usuario actualizado correctamente');
      this.modalController.dismiss();
    }).catch(error => {
      alert('Error al actualizar el usuario: ' + error);
    });
  }
  

  dismiss() {
    this.modalController.dismiss();
  }

}
