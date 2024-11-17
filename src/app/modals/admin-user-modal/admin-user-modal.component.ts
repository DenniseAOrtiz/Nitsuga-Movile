// admin-user-modal.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { DbService } from '../../services/db.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-admin-user-modal',
  templateUrl: './admin-user-modal.component.html',
  styleUrls: ['./admin-user-modal.component.scss'],
})
export class AdminUserModalComponent implements OnInit {
  @Input() userId!: number;
  isAdmin: number = 0;
  user: any[] = [];

  constructor(
    private dbService: DbService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.dbService.getUserStatus(this.userId).then((user) => {
      this.isAdmin = user.isAdmin;
    });
  }

  toggleAdmin() {
    this.isAdmin = this.isAdmin === 1 ? 0 : 1;
    this.dbService.updateUserAdminStatus(this.userId, this.isAdmin)
      .then(() => {
        alert('Estado de administrador actualizado');
        this.modalController.dismiss({ updated: true }); 
      })
      .catch(error => alert('Error al actualizar admin: ' + error));
  }
  
  dismiss() {
    this.modalController.dismiss(); 
  }
  
}

